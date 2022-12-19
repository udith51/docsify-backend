const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const doctorAuthRoute = require("./routes/doctorAuth");
const patientAuthRoute = require("./routes/patientAuth");
const doctorRoute = require("./routes/doctor");
const patientRoute = require("./routes/patient");
const blogRoute = require("./routes/blog")

dotenv.config();
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        res.status(503).send(err);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("common"));
app.use("/api/auth/doctor", doctorAuthRoute);
app.use("/api/auth/patient", patientAuthRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/patient", patientRoute);
app.use("/api/blog", blogRoute);

app.listen(8800, () => {
    console.log("Listening to port 8800");
})
