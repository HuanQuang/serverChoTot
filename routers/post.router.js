import express from "express";
import { getPost, newPost, queryId, checkLiked} from "../controllers/post.controller.js";
const post = express.Router()

post.get('/', getPost)
post.post('/', newPost)
post.post('/:id/isliked', checkLiked)
post.get('/:id',queryId)
export default post