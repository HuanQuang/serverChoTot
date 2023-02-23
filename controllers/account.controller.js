import  account from '../modals/account.modal.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js';

export const getAccount = async (req, res) => {
    try {
        const listAccount = await account.find();
        return res.status(200).json(listAccount)
    }
    catch(err) {
        return res.status(500).json({err: err})
    }
}
export const updateAccount = async (req, res) => {
    try {
        const newData = req.body
        const id = req.userId
        const update = await account.findByIdAndUpdate(id, newData)
        await update.save()
        const newUpdate = await account.findById(id);
        return res.status(200).json({message:"Cập nhật thành công",
        user: {
            id:newUpdate._id, 
            phone:newUpdate.phone, 
            avatar: newUpdate.avatar.url, 
            fullName: newUpdate.fullName, 
            age: newUpdate.age,
            gender: newUpdate.gender,
            role: newUpdate.role,
            address: newUpdate.address,
            email: newUpdate.email,
            social: newUpdate.social,
            post: newUpdate.post,
            time: newUpdate.createdAt
        }
        }

)

    } catch (error) {
        return res.status(500).json(error)
        
    }
}
export const updateAvatar = async (req, res) => {
    const image = req.body.img
    try {
        const id = req.userId
        const transform = await cloudinary.v2.uploader.upload(image, {
            folder: 'accountImg',
            width: 110,
            crop: 'scale'
        })
        const update = await account.findByIdAndUpdate(id, {
            avatar: {
                public_id: transform.public_id, 
                url: transform.secure_url
            }})
        await update.save()
        const newUpdate = await account.findById(id);
        return res.status(200).json({
            message:"Cập nhật thành công",
        user: {
            id:newUpdate._id, 
            phone:newUpdate.phone, 
            avatar: newUpdate.avatar.url, 
            fullName: newUpdate.fullName, 
            age: newUpdate.age,
            gender: newUpdate.gender,
            role: newUpdate.role,
            address: newUpdate.address,
            email: newUpdate.email,
            social: newUpdate.social,
            post: newUpdate.post,
            time: newUpdate.createdAt
        }
        }

)

    } catch (error) {
        return res.status(500).json(error)
        
    }
}
export const deleteAccount = async (req, res) => {
    try {
        const deleteAccount = req.params._id
        const toDelete = account.findByIdAndDelete(deleteAccount)
        await toDelete.save()
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const login = async (req, res) => {
    try {
        const user = req.body.phone
        const password = req.body.password
        const checkAccount = await account.findOne({phone: user, password: password})
        if(checkAccount){
            const token = jwt.sign({
                id:checkAccount._id, 
                phone:checkAccount.phone, 
                avatar: checkAccount.avatar.url, 
                fullName: checkAccount.fullName, 
                age: checkAccount.age,
                gender: checkAccount.gender,
                role: checkAccount.role,
                address: checkAccount.address,
                email: checkAccount.email,
                social: checkAccount.social,
                post: checkAccount.post,
                time: checkAccount.createdAt
        },
                process.env['SECRET_KEY'], 
                {
                    expiresIn:3600
                })
            return res.status(200).json({
                message: 'Đăng nhập thành công',
                token: token,
               })
        } else return res.status(202).json({
            message: 'Sai tên đăng nhập hoặc mật khẩu'
        })
    }
    catch (error){
        return res.status(500).json({
            message: 'Lỗi server',
            error: error})
    }
}
export const register =  async (req, res) => {
    const newData = req.body
    try {
        let checkAccount = await account.findOne({ phone: newData.phone })
        if(checkAccount){
            return res.status(200).json("Tài khoản đã tồn tại")
        }
        else {
            const creatAccount = new account(newData)
            await creatAccount.save()
            return res.status(200).json("Đăng kí thành công")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getUserLogin = async (req, res) => {
    try {
        const userId = req.userId
        const user = await account.findById(userId)
        res.json({
                id:user._id, 
                phone:user.phone, 
                avatar: user.avatar.url, 
                fullName: user.fullName, 
                age: user.age,
                gender: user.gender,
                role: user.role,
                address: user.address,
                email: user.email,
                social: user.social,
                post: user.post,
                time: user.createdAt
        })
    } catch (error) {
        res.status(500).json(error)
    }
}