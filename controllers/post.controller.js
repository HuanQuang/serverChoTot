import post from '../modals/post.modal.js';
import cloudinary from '../utils/cloudinary.js';
import account from '../modals/account.modal.js';

export const getPost = async (req, res) => {
    
    try {
        const listPost = await post.find();
        return res.status(200).json(listPost)
    }
    catch(err) {
        return res.status(500).json({err: err})
    }
}

export const newPost = async (req, res) => {
    const image = req.body.img
    const userId = req.userId
    try {
        const poster = await account.findById(userId)
        const arr = []
        for(let i = 0; i< image.length; i++){
            arr.push(
               await cloudinary.v2.uploader.upload(image[i], {
                    folder: 'postImage',
                    crop: 'scale'
                }).then(resual => resual.secure_url)
            )
        }
        const edided = {
            userId: userId,
            poster: {
                fullName: poster.fullName,
                phone:poster.phone,
                avatar: poster.avatar.url,
                userId:userId
            },
            type: req.body.type,
            title: req.body.title,
            description: req.body.description,
            address: req.body.address,
            information: req.body.information,
            img:  arr,
        }
        const createPost = new post(edided)
        await createPost.save()
        return res.status(200).json('Create new post is Success')
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const queryId = async (req, res) => {
    const id = req.params.id
    try {
        const getPost = await post.findById(id)
        return res.status(200).json(getPost)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// Check liked status this post
export const checkLiked = async (req, res) => {
    const postId = req.params.id
    const userId = req.userId
    try {
        const getPost = await post.findById(postId)
        const check = getPost.liked.find(id => id === userId)
        if(check){
            return res.status(200).json(true)
        }else return res.status(200).json(false)

    } catch (error) {
        return res.status(500).json(error)       
    }
}

// Handle like post and unLike
export const LikePost = async (req, res) => {
    const postId = req.params.id
    const userId = req.userId
    const checked = req.body.checked
    try {
        if(checked){
            await post.findByIdAndUpdate(postId,{$pull:{ liked: userId}})
            return res.status(200).json(false)
        }else{
            await post.findByIdAndUpdate(postId,{$push:{ liked: userId}})
            return res.status(200).json(true)
        }

    } catch (error) {
        return res.status(500).json(error)       
    }
}

// Hàm lấy danh sách tin mà user đã đăng
export const getListfromUser = async(req,res) => {
    const userId = req.params.userId
    try {
        const list = await post.find({userId: userId})
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(error)       
    }
}

// Hàm tìm kiếm bằng từ khoá
export const getListFromSearchKey = async (req,res) => {
    const searchKey = req.params.searchKey
    try {
        const list = await post.find({$or: [ {title: new RegExp(searchKey, 'i')} , {type: new RegExp(searchKey, 'i') }]})
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(error)       
    }
}

// Hàm lấy danh sách tin đã lưu
export const getListSaved = async (req,res) => {
    const userId = req.userId
    try {
        const list = await post.find({liked: userId})
        console.log(list)
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(error)       
    }
}