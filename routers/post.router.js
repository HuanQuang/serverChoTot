import express from "express";
import { getPost, newPost } from "../controllers/post.controller.js";
const post = express.Router()

post.get('/', getPost)
post.post('/', newPost)

export default post