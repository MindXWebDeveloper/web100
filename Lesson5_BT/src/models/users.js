import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userName: String,
    email: String,
    age: Number,
    role: String,
    isActive: Boolean,
    createdAt: Date
});

const UserModel = mongoose.model("users", usersSchema);

export default UserModel;