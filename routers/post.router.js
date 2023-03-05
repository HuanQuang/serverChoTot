import express from "express";
import { getPost, newPost, queryId, checkLiked,LikePost,getListfromUser} from "../controllers/post.controller.js";
const post = express.Router()

post.get('/', getPost)
post.post('/', newPost)
post.post('/:id/is-liked', checkLiked)
post.put('/:id/is-liked', LikePost)
post.get('/:id',queryId)
post.get('/poster/:userId',getListfromUser)

export default post