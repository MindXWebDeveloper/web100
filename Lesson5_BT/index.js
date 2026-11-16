import express from "express"
import mongoose from "mongoose"
import dns from "node:dns";
import { customerRouter } from "./src/routers/customer.js";
import { postRouter } from "./src/routers/post.js";

const app = express();
app.use(express.json());
dns.setServers(["8.8.8.8", "1.1.1.1"]);
mongoose.connect("mongodb+srv://thanhlv10041999_db_user:zW6goEC8ZSAa1i9M@mindx-web100.7btepyx.mongodb.net/lesson4");

app.get("/", (req, res) => {
    res.send({
        message: "Application start!"
    })
})

app.use("/customers", customerRouter)
app.use("/posts", postRouter)
app.listen(3000, () => {
    console.log("Server is running port 3000!")
})