import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    id: String,
    content: String,
    authorId: String,
    isEdited: Boolean,
    createdAt: Date
});

const CommentModel = mongoose.model("comments", commentsSchema);

export default CommentModel;