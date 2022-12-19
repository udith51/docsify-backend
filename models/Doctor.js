const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
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
            // required: true,
            enum: ["Male", "Female", "Others"]
        },
        age: {
            type: Number,
            min: 25
        },
        specialism: {
            type: Array,
            default: []
        },
        degree: {
            type: Array,
            default: []
        },
        experience: {
            type: Number,
            default: 0
        },
        fees: {
            type: Number
        },
        clinic: {
            type: Array,
            default: []
        },
        profilePicture: {
            type: String
        },
        followers: {
            type: Array,
            default: []
        },
        blogs: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model("Doctor", DoctorSchema);