const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/all", async (req, res) => {
    try {
        const allDoctors = await Doctor.find();
        res.status(200).json(allDoctors);
    }
    catch (e) {
        res.status(400).json(e);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json(doctor);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;


// Get all doctors
// Get a doctor