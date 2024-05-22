const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, ()=> {
    console.log("I'm listening");
});


// Get form data
const uname = document.getElementById('username').value;
const pword = document.getElementById('password').value;
const fName = document.getElementById('firstname').value;
const lName = document.getElementById('lastname').value;
const emailaddress = document.getElementById('email').value;
const phonenumber = document.getElementById('phone').value;
const zcode = document.getElementById('zipcode').value;

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
});
