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
    const userId = req.body.userID
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
                avatar: poster.avatar.url
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