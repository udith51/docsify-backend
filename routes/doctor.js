const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

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

router.put("/:id/follow", async (req, res) => {
    if (req.params.id != req.body.userId) {
        try {
            const doctor = await Doctor.findById(req.params.id);
            const patient = await Patient.findById(req.body.userId);
            if (!patient.following.includes(req.params.id)) {
                await patient.updateOne({ $push: { following: req.params.id } });
                await doctor.updateOne({ $push: { followers: req.body.userId } });

            } else {
                res.status(400).send("You already follow this doctor");
            }
            res.status(200).send("Doctor has been followed");
        } catch (e) {
            res.status(500).json(e);

        }
    } else {
        res.status(401).send("You can't follow yourself");
    }
})

router.put("/:id/unfollow", async (req, res) => {
    if (req.params.id != req.body.userId) {
        try {
            const doctor = await Doctor.findById(req.params.id);
            const patient = await Patient.findById(req.body.userId);
            console.log(doctor);
            console.log(patient);
            if (patient.following.includes(req.params.id)) {
                await doctor.updateOne({ $pull: { followers: req.body.userId } });
                await patient.updateOne({ $pull: { following: req.params.id } });
                res.status(200).send("Doctor unfollowed");
            } else {
                res.status(400).send("You do not follow this doctor");
            }
        } catch (e) {
            res.status(500).send(e);
        }

    }
    else {
        res.status(401).send("You can't unfollow yourself");
    }
})

module.exports = router;


// Get all doctors
// Get a doctor
// Follow a doctor