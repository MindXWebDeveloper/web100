import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: String,
    userName: String,
    dob: Date,
    phone: String,
    email: String,
    gender: String
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;