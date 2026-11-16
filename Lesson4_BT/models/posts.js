import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    authorId: String,
    tags: [String],
    status: String,
    likes: [String],
    views: Number,
    createdAt: Date,
    updatedAt: Date
});

const PostModel = mongoose.model("posts", postsSchema);

export default PostModel;