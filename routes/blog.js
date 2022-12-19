const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const Doctor = require("../models/Doctor")


router.post("/new", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        const doctor = await Doctor.findById(req.body.bloggerId);
        await doctor.updateOne({ $push: { blogs: blog._id } });
        res.status(200).send("Blog successfully created");

    } catch (e) {
        res.status(500).send(e);
    }
})

router.get("/all", async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).json(allBlogs);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    }
    catch (e) {
        res.status(500).send(e);
    }
})

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
        }
        res.status(200).json(post);
    }
    catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;

// Only for doctors
// Get all blogs
// Get a blog
// Like/Dislike a blog