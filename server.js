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