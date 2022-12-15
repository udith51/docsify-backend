const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const Doctor = require("../models/Doctor")

router.get("/", (req, res) => {
    res.send("Doctor Route Pg");
})
router.post("/register", async (req, res) => {
    const newDoctor = new Doctor(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPsd = await bcrypt.hash(req.body.password, salt);
    newDoctor.password = hashedPsd;
    try {
        const doctor = await newDoctor.save();
        res.status(200).json(doctor);
    }
    catch (e) {
        res.status(400).send(e);
    }
})
router.post("/login", async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ email: req.body.email });
        !doctor && res.status(404).send("Doctor not found");
        if (!req.body.password) {
            const exception = new Error();
            exception.response = {
                status: 401,
                message: "Password not present"
            };
            throw exception;
        }
        const validPsd = await bcrypt.compare(req.body.password, doctor.password);
        !validPsd && res.status(400).send("Wrong Password");
        res.status(200).send(doctor);
    } catch (e) {
        res.status(e.response.status || 500).send(e.response.message || e);
    }
})

router.put("/:id", async (req, res) => {
    if (req.params.id == req.body.userId || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(salt, req.body.password);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        }
        try {
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json(doctor);
        } catch (e) {
            res.status(500).send(e);
        }

    } else {
        return res.status(401).send("You are not authorized to update");
    }

})

module.exports = router;


// Login Doctor
// Register Doctor
// Update Doctor