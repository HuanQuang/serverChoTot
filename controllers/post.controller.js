import post from '../modals/post.modal.js';

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
    const postData = req.body
    console.log(postData)
    try {
        const createPost = new post(postData)
        await createPost.save()
        return res.status(200).json('Create new post is Success')
    } catch (error) {
        return res.status(500).json(error)
    }
}
