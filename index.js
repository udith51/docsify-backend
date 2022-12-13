const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const doctorAuthRoute = require("./routes/doctorAuth");
const patientAuthRoute = require("./routes/patientAuth");

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
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("common"));
app.use("/api/auth/doctor", doctorAuthRoute);
app.use("/api/auth/patient", patientAuthRoute);

app.listen(8800, () => {
    console.log("Listening to port 8800");
})
