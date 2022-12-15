const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient")

router.get("/all", async (req, res) => {
    try {
        const allPatients = await Patient.find();
        res.send(allPatients);
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        res.status(200).json(patient);
    } catch (e) {
        res.status(400).send(e);
    }
})


module.exports = router


// Get all Patients
// Get a patient