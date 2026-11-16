import express from "express"
import mongoose from "mongoose";
import UserModel from "./models/user.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://thanhlv10041999_db_user:zW6goEC8ZSAa1i9M@mindx-web100.7btepyx.mongodb.net/lesson4",
);

app.get("/", async (req, res) => {
    res.send("Start");
});

app.post("/user", async (req, res) => {
    try{
        const {userName, dob, phone, email, gender } = req.body;
        if(!userName || !dob || !phone || !email || !gender) {
            return res.status(400).send({ message: "Missing data" })
        }

        const newUser = await UserModel.create({
            userName,
            dob,
            phone,
            email,
            gender
        });

        res.status(201).send({
            message: "Tạo thông tin người dùng thành công!",
            data: newUser
        });

    }catch(error){}
})

app.get("/user", async (req, res) => {
    const users = await UserModel.find();
    res.status(200).send({ data: users })
})

app.get("/user/:id", async (req, res) => {
    try{
        const id = req.params;
        const user = UserModel.findById(id);

        if(!user){
            return res.status(404).send({message: "Khong tim thay user"});
        }

        res.status(201).send({ 
            message: "Thanh cong",
            data: user     
        })
    }catch (error) {
        res.status(500).send("Server error")
    }
})

app.put("/user/:id", async (req, res) => {
    try{
        const id = req.params;
        const userName = req.body;
        const user = await UserModel.findByIdAndUpdate(id, {
            userName
        });

        if(!user) {
            return res.status(404).send({message: "Nguoi dung khong ton tai"})
        }

        res.status(201).send({
            message: "Cap nhat thanh cong",
            data: user
        })
    }catch(error){}
});

app.delete("/user/:id", async (req, res) => {
    const id = req.params;
    const user = UserModel.findByIdAndDelete(id)

    if(!user) {
        return res.status(404).send({message: "Nguoi dung khong ton tai"})
    }

    res.status(201).send({
        message: "Xoa nguoi dung thanh cong"
    })
})

app.listen(3000, () => {
    console.log("Server is running port 3000")
})