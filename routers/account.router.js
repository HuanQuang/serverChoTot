import express from "express";
const account = express.Router()
import { getAccount, updateAccount, deleteAccount, login, register, getUserLogin } from '../controllers/account.controller.js'
import { isAuth} from '../Middeware/AuthMidderware.js'
account.get('/', getAccount)
account.put('/',isAuth,updateAccount )
account.delete('/:id', deleteAccount)

account.post('/login', login)
account.post('/', register)
account.get('/me',isAuth, getUserLogin)
export default account