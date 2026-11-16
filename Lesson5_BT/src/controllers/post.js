import CommentModel from "../models/comments.js";
import PostModel from "../models/posts.js";
import UserModel from "../models/users.js";

const createPost = async (req, res) => {
    try {
        const { title, content, authorId, tags, status} = req.body;

        const currentUser = await UserModel.findById(authorId);
        if(!currentUser) {
            return res.status(404).send({
                message: "User not found"
            })
        }

        if(!currentUser.isActive) {
            return res.status(403).send({
                message: "User is not active"
            })
        }

        const newPost = await PostModel.create({
            title,
            content,
            authorId,
            tags,
            status,
            likes: 0,
            views: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: "POST" + String(Date.now())
    });
    return res.status(201).send({
        message: "Tạo bài viết thành công",
        data: newPost
        });
    } catch (error) {
        res.send({
            message: "Loi!"
        })
    }
}

const getTopPost = async (req, res) => {
    try {
       const limit = Number(req.query.limit ?? 3);

       const posts = await PostModel.find({ status: "published" });

       const postIds = posts.map(item => item.id);

       const comments = await CommentModel.find({ postId: {$in: postIds} });
       
       const commentCounts = new Map();

       comments.forEach(item => {
        commentCounts.set(item.postId, (commentCounts.get(item.postId) ?? 0) + 1)
       })

       const result = posts.map(post => {
            let totalLikes = post.likes.length ?? 0;
            let totalComments = commentCounts.get(post.id) ?? 0;
            let views = post.views ?? 0
            let score = (totalLikes * 3) + (totalComments * 2) + (views / 10);
            return {
                id: post.id,
                title: post.title,
                totalLikes: totalLikes,
                totalComments: totalComments,
                views: views,
                score: score
            };
       }).sort((a, b) => b.score - a.score);

       res.status(201).send({
            message: "Thanh cong!",
            data: result.slice(0, limit)
       })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}

export {createPost, getTopPost}