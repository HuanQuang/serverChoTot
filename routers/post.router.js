import express from "express";
import { getPost, newPost, queryId, checkLiked,LikePost,getListfromUser,getListFromSearchKey, getListSaved} from "../controllers/post.controller.js";
import { isAuth } from "../Middeware/AuthMidderware.js";
const post = express.Router()

post.get('/', getPost)
post.post('/',isAuth, newPost)
post.post('/:id/is-liked',isAuth, checkLiked)
post.put('/:id/is-liked',isAuth, LikePost)
post.get('/:id',queryId)
post.get('/poster/:userId',getListfromUser)
post.get('/:searchKey/result',getListFromSearchKey)
post.post('/luu-tin',isAuth,getListSaved)

export default post