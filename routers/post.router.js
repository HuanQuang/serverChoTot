import express from "express";
import { getPost, newPost, queryId } from "../controllers/post.controller.js";
const post = express.Router()

post.get('/', getPost)
post.post('/', newPost)
post.get('/:id',queryId)
export default post