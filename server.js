const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
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
const summaryCache = new NodeCache({ stdTTL: 86400 }); // cache for 24 hours

(async () => {
  const { pipeline } = await import('@xenova/transformers');
  summarizationPipe = await pipeline('summarization');
  console.log("Summarization pipeline is ready");
})();

app.post('/summarize', async (req, res) => {
  const start = Date.now();
  const inputText = req.body.text;
  if (!inputText) {
    return res.status(400).send({ error: 'Text input is required' });
  }

  console.log("Received input text:", inputText);

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
    const summarizeStart = Date.now();
    const result = await summarizationPipe(inputText, { max_length, min_length });
    console.log("Summarization time:", Date.now() - summarizeStart, "ms");

    const summary = result[0].summary_text;
    console.log("Total time:", Date.now() - start, "ms");
    res.send({ summary });
  } catch (error) {
    console.error('Error during summarization:', error);
    res.status(500).send({ error: 'Failed to summarize text' });
  }
});

// Update the DB from the signup page
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
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      })

    res.status(200).send("Signup successful");

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "This profile already exists with the username and/or email address. Please create a new profile.", details: error.message });
  }
});

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
    res.send('login.html');

  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});

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
      const user = result.rows[0];
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ username: user.username, email: user.email }, jwtSecretKey, { expiresIn: '6h' });
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials or email not verified");
    }

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

app.get("/main", validateToken, (req, res) => {
  res.status(200).send(`${req.user.username} is signed in.`);
});

function validateToken(req, res, next) {
  const token = localStorage.getItem('token');
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

app.post('/api/profile', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const query = 'SELECT username, password, firstname, lastname, email, phone, zipcode FROM accounts WHERE username = $1 AND password = $2';
    const result = await client.query(query, [username, password]);
    client.release();

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/updateProfile', upload.single('profileImage'), async (req, res) => {
  const { username, password, firstname, lastname, phone, zipcode } = req.body;
  const profileImage = req.file ? `images/${req.file.filename}` : null;

  try {
    const client = await pool.connect();
    let query = `
      UPDATE accounts SET firstname = $3, lastname = $4, phone = $5, zipcode = $6
      WHERE username = $1 AND password = $2
    `;
    let values = [username, password, firstname, lastname, phone, zipcode];

    if (profileImage) {
      query = `
        UPDATE accounts SET firstname = $3, lastname = $4, phone = $5, zipcode = $6, profile_image = $7
        WHERE username = $1 AND password = $2
      `;
      values = [username, password, firstname, lastname, phone, zipcode, profileImage];
    }

    await client.query(query, values);
    client.release();

    res.json({ message: 'Profile updated successfully', profileImageUrl: profileImage });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});