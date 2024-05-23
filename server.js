/*const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, ()=> {
    console.log("I'm listening");
});


// Get form data
app.post("/signup", async (req, res) => {
const uname = document.getElementById('username').value;
const pword = document.getElementById('password').value;
const fName = document.getElementById('firstname').value;
const lName = document.getElementById('lastname').value;
const emailaddress = document.getElementById('email').value;
const phonenumber = document.getElementById('phone').value;
const zcode = document.getElementById('zipcode').value;
})


// Create connection pool to the database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'notessimpledb_user',
  host: 'postgres://notessimpledb_user:mlKQ61wvErytUB88eppqHaiN643yNyWq@dpg-cp2d2mun7f5s73ffjjug-a/notessimpledb',
  database: 'notessimpledb',
  password: 'mlKQ61wvErytUB88eppqHaiN643yNyWq',
  port: 5432, 
});

(async () => {
  try {
    // Connect to the database
    const client = await pool.connect();
    
    // Create the query string
    const qstring = "INSERT INTO accounts (username, password, firstname, lastname, email, phone, zipcode) VALUES ('$uname','$pword', '$fName', '$lName', '$emailaddress', $phonenumber, $zcode)";
    
    // Execute a query
    const res = await client.query('$qstring');

    // Release the client connection back to the pool
    client.release();

  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    // Close the connection pool when finished (optional)
    await pool.end();
  }
});*/

const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Create connection pool to the database with SSL enabled
const pool = new Pool({
  user: 'notessimpledb_user',
  host: 'dpg-cp2d2mun7f5s73ffjjug-a.oregon-postgres.render.com', 
  database: 'notessimpledb',
  password: 'mlKQ61wvErytUB88eppqHaiN643yNyWq',
  port: 5432,
  ssl: {
    rejectUnauthorized: false 
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, firstname, lastname, email, phone, zipcode } = req.body;

  try {
    const client = await pool.connect();

    const query = `
      INSERT INTO accounts (username, password, firstname, lastname, email, phone, zipcode) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [username, password, firstname, lastname, email, phone, zipcode];

    await client.query(query, values);

    client.release();

    res.status(200).send("Signup successful");

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});