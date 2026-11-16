import { Router } from "express";
import { createPost, getTopPost } from "../controllers/post.js";
import { createPostMiddleWare, TopPostMiddleWare } from "../middlewares/post.js";

const postRouter = Router();

postRouter.post("", createPostMiddleWare, createPost);

postRouter.get("/top", TopPostMiddleWare, getTopPost)

export {postRouter}