import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./routes/blogPosts.routes.js";
const app = express();

app.use(express.json());
app.use("/", usersRoutes);
const PORT = process.env.PORT || 4545;
mongoose.connect(process.env.MONGODB_URI).then(
    app.listen(PORT, () => {
        console.log(`Server is Listening on port ${PORT}`);
    })
);
