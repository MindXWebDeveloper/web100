import express from "express"
import mongoose, { now } from "mongoose"
import dns from "node:dns";
import UserModel from "./models/users.js";


const app = express();
app.use(express.json());
dns.setServers(["8.8.8.8", "1.1.1.1"]);
mongoose.connect("mongodb+srv://thanhlv10041999_db_user:zW6goEC8ZSAa1i9M@mindx-web100.7btepyx.mongodb.net/lesson4");

app.get("/users", async (req, res) => {
    try{
        const { role, isActive, minAge, maxAge } = req.query;
        const filter = {}
        if(role) {
            filter.role = role;
        }

        if(isActive){
            filter.isActive = isActive === "true";
        }

        if(minAge && !isNaN(Number(minAge))){
            filter.minAge = { $gte: Number(minAge)}
        }

         if(maxAge && !isNaN(Number(maxAge))){
            filter.minAge = { $lte: Number(maxAge)}
        }

        const users = UserModel.find(filter);
        res.status(200).send({
            message: "Thanh cong!",
            data: users
        })
        } catch (error) {
            res.status(500).send({message: error.message});
        }
});

app.get("/user/:id", async(req, res) => {
    try {
        const id = req.params;
        const filter = {}
        if(id){
            filter.id = id;
        }

        const user = UserModel.find(filter);

        if(!user) {
            return res.status(404).send({ message: "Nguoi dung khong ton tai!"});
        }

        res.status(201).send({
            message: "Thanh cong",
            data: user
        })
    } catch (error) {
        res.status(500).send({message: error.message})
    }
});

app.post("/users", async (req, res) => {
    try {
        const {userName, email, age } = req.body;
        
        if(userName.length < 3 || userName.length > 50 || !userName) {
            return res.status(400).send({message: "Ten khong hop le"});
        }
        if(!String(email).includes("@") || !email) {
            return res.status(400).send({message: "Email khong hop le"});
        }
        if(!Number.isInteger(Number(age)) || Number(age) < 6 || !age) {
            return res.status(400).send({message: "Tuoi khong hop le"});
        }

        const existEmail =  await UserModel.findOne({
            email: {
                $regex: email,
                $options: "i"
            }
        });

        if(existEmail) {
            return res.status(400).send({message: "Email da ton tai"});
        }
        const user = {
            userName: String(userName).trim(),
            email: String(email).trim(),
            age: Number(age),
            role: "user",
            isActive: true,
            createdAt: Date.now()
        }

        const newUser = await UserModel.create(user);

        res.status(201).send({
            message: "Tạo thông tin người dùng thành công!",
            data: newUser
        });


    } catch (error) {
        res.status(500).send({ message: error.message})
    }
})

app.listen(5000, () => {
    console.log("Server is running port 5000!")
})