import { Posts, Users } from "../models/blogPostModel.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find().populate("comments");
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const post = new Posts({ title, author, content });
        await post.save();
        await Users.findByIdAndUpdate(
            author,
            { $push: { posts: post._id } },
            { new: true }
        );
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
