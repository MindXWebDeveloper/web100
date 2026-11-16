import express from "express"
import mongoose from "mongoose"
import dns from "node:dns";
import UserModel from "./src/models/users.js";
import { getAllUsers } from "./src/controllers/user.js";
import userRouter from "./src/routes/user.js";


const app = express();
app.use(express.json());
dns.setServers(["8.8.8.8", "1.1.1.1"]);
mongoose.connect("mongodb+srv://thanhlv10041999_db_user:zW6goEC8ZSAa1i9M@mindx-web100.7btepyx.mongodb.net/lesson4");

app.get("/", (req, res) => {
    res.send({
        message: "Chao ban!"
    })
})

// app.get("/users", getAllUsers)

app.use("/users", userRouter)

app.listen(5000, () => {
    console.log("Server is running port 5000!")
})