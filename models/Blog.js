const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
    bloggerId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("Blog", BlogSchema);