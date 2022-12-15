const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Patient = require("../models/Patient");

router.get("/", (req, res) => {
    res.send("Patient Route Pg");
})

router.post("/register", async (req, res) => {
    const newPatient = new Patient(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPsd = await bcrypt.hash(req.body.password, salt);
    newPatient.password = hashedPsd;
    try {
        const patient = await newPatient.save();
        res.status(200).json(patient);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post("/login", async (req, res) => {
    try {
        const patient = await Patient.findOne({ email: req.body.email });
        !patient && res.status(404).send("Patient not found");
        if (!req.body.password) {
            const exception = new Error();
            exception.response = {
                status: 401,
                message: "Password not present"
            };
            throw exception;
        }
        const validPsd = await bcrypt.compare(req.body.password, patient.password);
        !validPsd && res.status(404).send("Wrong Password");
        res.status(200).send(patient);
    }
    catch (e) {
        res.status(e.response.status || 500).send(e.response.msg || e);
    }
})

router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = bcrypt.hash(salt, req.body.password);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        }
        try {
            const patient = await Patient.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Account updated");
        }
        catch (e) {
            res.status(500).send(e);
        }
    }
    else {
        return res.status(401).send("You are not authorized to update");
    }
})

module.exports = router


// Login patient
// Register patient
// Update patient