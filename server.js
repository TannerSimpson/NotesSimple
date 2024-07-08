const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const sgMail = require('@sendgrid/mail');

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

let summarizationPipe;
const summaryCache = new NodeCache({ stdTTL: 3600 }); // cache for one hour

(async () => {
  const { pipeline } = await import('@xenova/transformers');
  summarizationPipe = await pipeline('summarization');
  console.log("Summarization pipeline is ready");
})();

app.post('/summarize', async (req, res) => {
  const inputText = req.body.text;
  if (!inputText) {
    return res.status(400).send({ error: 'Text input is required' });
  }

  const cacheKey = `summary_${inputText}`;
  const cachedSummary = summaryCache.get(cacheKey);

  if (cachedSummary) {
    console.log("Cache hit for:", cacheKey);
    return res.send({ summary: cachedSummary });
  }

  console.log("Cache miss for:", cacheKey);

  const wordCount = (text) => text.split(/\s+/).filter(word => word.length > 0).length;
  const numWords = wordCount(inputText);

  let numSentences;
  if (numWords <= 2000) {
    numSentences = 4;
  } else if (numWords <= 4000) {
    numSentences = 8;
  } else if (numWords <= 6000) {
    numSentences = 15;
  } else if (numWords <= 10000) {
    numSentences = 20;
  } else {
    numSentences = 24;
  }

  const max_length = numSentences * 20;
  const min_length = numSentences * 10;

  try {
    const result = await summarizationPipe(inputText, { max_length, min_length });
    const summary = result[0].summary_text;
    summaryCache.set(cacheKey, summary);
    res.send({ summary });
  } catch (error) {
    console.error('Error during summarization:', error);
    res.status(500).send({ error: 'Failed to summarize text' });
  }
});

// Update the DB from the signup page
// using Twilio SendGrid's v3 Node.js Library sending out the email verification 

// Endpoint to handle user signup
app.post("/signup", async (req, res) => {
  // Destructure the user data from the request body
  const { username, password, firstname, lastname, email, phone, zipcode } = req.body;

  try {
    // Connect to the SQL database
    const client = await pool.connect();

    // SQL query to insert new user data into the accounts table
    const query = `
      INSERT INTO accounts (username, password, firstname, lastname, email, phone, zipcode) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    // Values to be used in the query
    const values = [username, password, firstname, lastname, email, phone, zipcode];

    // Execute the query with the provided values
    await client.query(query, values);

    // Release the database client back to the pool
    client.release();

    // Create the email verification template
    const HTMLtemplate = `
    <div style="font-family: inherit; text-align: left"><span style="font-family: verdana, geneva, sans-serif">Thank you for signing up with Notes Simple. &nbsp;Please click the link below to verify your email address and log into Notes Simple.</span></div><br><div style="font-family: inherit; text-align: left"><span style="font-family: verdana, geneva, sans-serif"><a href="https://notessimple-oaca.onrender.com/checkemail.html?x=${email}">Click here to verify your email address</a></span></div>
    `;

    // Email message details
    const msg = {
      to: email,
      from: 'admin@notessimple.com',
      subject: 'Welcome to Notes Simple. Please Verify Email Address',
      text: 'Thank you for signing up with Notes Simple.  Please click the link below to verify your email address and log into Notes Simple.',
      html: HTMLtemplate,
    }

    // Send the email using SendGrid
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent') // Log success message if email is sent successfully
      })
      .catch((error) => {
        console.error(error)
      })

    // Send success response to the client
    res.status(200).send("Signup successful");

  } catch (error) {
    // Handle any errors during the database operation
    console.error('Error connecting to database:', error);
    // Send an error response if there is a conflict with existing username/email
    res.status(500).json({ error: "This profile already exists with the username and/or email address. Please create a new profile.", details: error.message });
  }
});

// Update DB from email verification page
app.post("/emailverify", async (req, res) => {
  // Extract the email value from the request body
  const urlvalue = req.body.x;

  try {
    // connect to SQL database
    const client = await pool.connect();

    // query to updat emailvalid to yes
    const query = `
      UPDATE accounts SET emailvalid = 'YES' WHERE email = $1
    `;
    const values = [urlvalue]; // value used in the query

    // Execute the update query with the provided email value
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
  // extracting username and password from req.body
  const { username, password } = req.body;

  try {
    // connect to SQL database
    const client = await pool.connect();

    // select the username and password for the user provided and check if email is valid
    const query = `
      SELECT * FROM accounts WHERE username = $1 AND password = $2 AND emailvalid = 'YES'
    `;
    const values = [username, password]; // values used in the query

    // execute query 
    const result = await client.query(query, values);
    // Release the database client back to the pool
    client.release();

    // Check if a user was found with the provided credentials
    if (result.rows.length > 0) {
      // User is authenticated
      const user = result.rows[0]; // get user details from query result
      const jwtSecretKey = process.env.JWT_SECRET_KEY; // get JWT key from .env file
      // generate token with user's username and email valid for one hour
      const token = jwt.sign({ username: user.username, email: user.email }, jwtSecretKey, { expiresIn: '1h' });

      // handling response
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).send("Invalid credentials or email not verified");
    }

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Endpoint to access main page, protected by token validation middleware
app.get("/main", validateToken, (req, res) => {
  // Sending a response indicating successful validation and the username associated with the token
  res.status(200).send(`${req.user.username} is signed in.`);
});

// Middleware function to validate JWT token
function validateToken(req, res, next) {
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
