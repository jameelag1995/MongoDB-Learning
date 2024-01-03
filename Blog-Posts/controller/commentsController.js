import { Comments, Posts } from "../models/blogPostModel.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comments.find();
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        // const createdComment = await Comments.create(req.body);
        const { post, author, content } = req.body;

        const comment = new Comments({ author, content, post });
        await comment.save();
        await Posts.findByIdAndUpdate(
            post,
            {
                $push: { comments: comment._id },
            },
            { new: true }
        );

        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
