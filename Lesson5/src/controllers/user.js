import UserModel from "../models/users.js";

const getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.send({
        message: "Thanh cong!",
        data: users
    })
};

export {getAllUsers};