const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        res.send(503).send(err);
    })

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Welcome to Docsify");
})

app.listen(8800, () => {
    console.log("Listening to port 8800");
})
