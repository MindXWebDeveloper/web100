import { Router } from "express";
import { getAllUsers } from "../controllers/user.js";

const userRouter = Router();

userRouter.get("", (req, res, next) => {
    const failureRequest = true;
    if(failureRequest) {
        return res.status(400).send({
            message: "Request failed"
        })
    }
    next(); // la ham cho phep req di tiep
},getAllUsers);

export default userRouter;