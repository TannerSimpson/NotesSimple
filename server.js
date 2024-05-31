const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());

// load environment variables from .env file
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

// Update the DB from the signup page
// using Twilio SendGrid's v3 Node.js Library sending out the email verification 

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

    //create the email template
    const HTMLtemplate = `
    <div style="font-family: inherit; text-align: left"><span style="font-family: verdana, geneva, sans-serif">Thank you for signing up with Notes Simple. &nbsp;Please click the link below to verify your email address and log into Notes Simple.</span></div><br><div style="font-family: inherit; text-align: left"><span style="font-family: verdana, geneva, sans-serif"><a href="https://notessimple-oaca.onrender.com/checkemail.html?x=${email}">Click here to verify your email address</a></span></div>
    `;

    const msg = {
      to: email,
      from: 'admin@notessimple.com',
      subject: 'Welcome to Notes Simple. Please Verify Email Address',
      text: 'Thank you for signing up with Notes Simple.  Please click the link below to verify your email address and log into Notes Simple.',
      html: HTMLtemplate,
    }    

    sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

    res.status(200).send("Signup successful");

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "This profile already exists with the username and/or email address. Please create a new profile.", details: error.message });
  }
});



// Update DB from email verification page
app.post("/emailverify", async (req, res) => {
  const urlvalue = req.body.x; 

  try {
    const client = await pool.connect();

    const query = `
      UPDATE accounts SET emailvalid = 'YES' WHERE email = $1
    `;
    const values = [urlvalue];
    
    await client.query(query, values);

    client.release();

    // Send the redirect URL in the response body
    res.send('login.html');
  
 } catch (error) {
    console.error('Error connecting to database:', error);
  }  
});


// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();

    const query = `
      SELECT * FROM accounts WHERE username = $1 AND password = $2 AND emailvalid = 'YES'
    `;
    const values = [username, password];

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length > 0) {
      // User is authenticated
      const user = result.rows[0];
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ username: user.username, email: user.email }, jwtSecretKey, { expiresIn: '1h' });

      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).send("Invalid credentials or email not verified");
    }

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Adding the login endpoint to server.js
/*
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connecting to the database
    const client = await pool.connect();
    // SQL query to select user data based on username
    const query = 'SELECT * FROM accounts WHERE username = $1';
    const values = [username];

    // Executing the query
    const result = await client.query(query, values);
    // Extracting the first row from the result
    const user = result.rows[0];

    // Releasing the client back to the pool
    client.release();

    // Checking if a user with the provided username exists and if the password matches 
    if (user && user.password === password) { 
      // Retrieving JWT secret key from environment variables
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      // Generating a JWT token with user ID and username payload, with expiration time set to 1 hour
      const token = jwt.sign({ userId: user.id, username: user.username }, jwtSecretKey, { expiresIn: '1h' });
      // Sending the token in the response
      console.log('generated token', token);
      res.json({ token });
    } else {
      // Responding with 401 status code if username or password is invalid
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    // Handling errors during login process
    console.error('Error during login:', error);
    res.status(500).send('Error');
  }
});*/

// Endpoint to access main page, protected by token validation middleware
app.get("/main", validateToken, (req, res) => {
  // Sending a response indicating successful validation and the username associated with the token
  res.status(200).send(`${req.user.username} is signed in.`);
});

// Middleware function to validate JWT token
function validateToken(req, res, next) {
  // Extracting token from the Authorization header
  // const token = req.header('Authorization').replace('Bearer ', '');

  //Extract token from local storage
  const token = localStorage.getItem('token');
  // Retrieving JWT secret key from environment variables
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    // Verifying the token with the secret key
    const verified = jwt.verify(token, jwtSecretKey);
    // Storing the verified user information in the request object
    req.user = verified;
    // Proceeding to the next middleware or route handler
    next();
  } catch (error) {
    // Responding with 401 status code if the token is invalid
    res.status(401).send("Invalid Token");
  }

}


// start the app on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
