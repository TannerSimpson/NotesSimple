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




/*
const express = require("express");
const app = express();
const path = require("path");
const { Pool } = require("pg");

const { getFormData } = require("./public/signup");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool({
    user: "notessimpledb_user",
    host: "dpg-cp2d2mun7f5s73ffjjug-a.ohio-postgres.render.com",
    database: "notessimpledb",
    password: "mlKQ61wvErytUB88eppqHaiN643yNyWq",
    port: 5432,
    ssl: true
});

app.post("/signup", async (req, res) => {
    // Get form data using the function from signup.js
    const formData = getFormData(req.body);

    try {
        const client = await pool.connect();

        // Execute database query with form data
        const query = `
            INSERT INTO Accounts (username, password, firstname, lastname, email, phone)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [
            formData.username,
            formData.password,
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.phone
        ];
        await client.query(query, values);

        client.release();
        res.redirect("/login.html"); // Redirect to login page upon successful signup
    } catch (error) {
        console.error('Error saving data to database:', error);
        res.status(500).send("Error saving data to database");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
}); */