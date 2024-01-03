import express from "express";
import { createUser, getAllUsers } from "../controller/usersController.js";
import { createPost, getAllPosts } from "../controller/postsController.js";
import {
    createComment,
    getAllComments,
} from "../controller/commentsController.js";

const route = express.Router();

// users routes
route.get("/api/users", getAllUsers);

route.post("/api/users", createUser);

// posts routes
route.get("/api/posts", getAllPosts);

route.post("/api/posts", createPost);

// comments routes
route.get("/api/comments", getAllComments);

route.post("/api/comments", createComment);

export default route;
