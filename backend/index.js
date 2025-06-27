const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.setHeader("content-type", "text/plain");
    res.status(200);
    res.send("Hello World!")
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});
