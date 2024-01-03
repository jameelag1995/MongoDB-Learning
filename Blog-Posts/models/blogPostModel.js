import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [2, "too short"],
            maxlength: 50,
            lowercase: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            validate: {
                validator: function (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                },
                message: "invalid email address",
            },
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }],
    },
    {
        timestamps: true,
    }
);

export const Users = mongoose.model("Users", userSchema);

const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            minlength: 1,
            maxlength: 256,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        content: {
            type: String,
            minlength: 10,
            maxlength: 256,
            required: true,
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    },
    {
        timestamps: true,
    }
);

export const Posts = mongoose.model("Posts", PostSchema);

const CommentsSchema = mongoose.Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        content: {
            type: String,
            minlength: 10,
            maxlength: 256,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Comments = mongoose.model("Comments", CommentsSchema);
