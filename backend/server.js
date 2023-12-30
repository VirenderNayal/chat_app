const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config()

app.get('/apicall', (req, res) => {
    res.send("API is running")
})

const PORT = process.env.PORT
app.listen(PORT, console.log("server started"))