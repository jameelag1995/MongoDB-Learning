import { Users } from "../models/blogPostModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find().populate("posts");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const createdUser = await Users.create(req.body);
        res.status(201).send(createdUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
