const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());

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

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

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

    const msg = {
      to: email,
      from: 'admin@notessimple.com',
      subject: 'Welcome to Notes Simple. Please Verify Email Address',
      text: 'Thank you for signing up with Notes Simple.  Please click the link below to verify your email address and log into Notes Simple.',
      html: '<div style="font-family: inherit; text-align: center"><span style="font-family: verdana, geneva, sans-serif">Thank you for signing up with Notes Simple. &nbsp;Please click the link below to verify your email address and log into Notes Simple.</span></div><style>div {text-align: center;}</style><div id="center"><a href="url">Click here to verify your email address</a></div>',
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
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
