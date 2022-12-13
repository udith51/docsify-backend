const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        sex: {
            type: String,
            enum: ["Male", "Female", "Others"]
        },
        age: {
            type: Number,
        },
        currentCity: {
            type: String,
        },
        currentState: {
            type: String,
        },
        previousHistory: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Patient", PatientSchema);