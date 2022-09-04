const Post = require('../models/post')
const UserAuth = require('../models/usersAuth')

const createPost = async (req, res) => {
    try {
        const { dataType, firstName, surname, avatar_url, text, captition, userId, field } = req.body
        const file_url = `http://localhost:5000/files/${req?.file?.filename}`
        const fileId = req?.file?.id
        let post

        // check type of data
        switch (dataType) {
            case 'data/text':
                post = await Post.create(
                    { 
                        dataType,
                        field,
                        user_info: { firstName, surname, avatar_url, userId },  
                        text_data: { text_content: text },
                        date: new Date().getTime(),
                    })
            break
            case 'data/image':
                post = await Post.create(
                    { 
                        dataType,
                        field,
                        user_info: { firstName, surname, avatar_url, userId },  
                        image_data: { captition, image_url: file_url, _id: fileId },
                        date: new Date().getTime(),
                    })
            break
            case 'data/video':
                post = await Post.create(
                    { 
                        dataType,
                        field,
                        user_info: { firstName, surname, avatar_url, userId },  
                        video_data: { captition, video_url: file_url, _id: fileId },
                        date: new Date().getTime(),
                    })
            break
            default:
                res.status(404).json({ message: 'dataType not found --- dataType = ' + dataType })
                return
        }

        res.status(200).json({ status: 200, message: 'post is created successfuly', data: post })

    } catch (error) {
        console.log("### Create Post Error ###")
        console.log(error)
    }
}

const getPosts = async (req, res) => {
    try {
        const {friends} = await UserAuth.findById(req.userId).select({ friends: 1 })

        const posts = await Post.find({ $or: [{ field: 'global' }, { field: 'private', "user_info.userId": req.userId }, { field: 'friends', "user_info.userId": friends }] }).sort({ date: -1 })
        // console.log(posts)
        res.status(200).json({ status: 200, message: 'fetch posts is successfuly', data: posts })
    } catch (error) {
        console.log("### Fetch Posts Error ###")
        console.log(error)
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params
        const { dataType, text_content, captition } = req.body
        let post

        switch (dataType) {
            case 'data/text':
                post = await Post.findOneAndUpdate({ _id: postId }, { "text_data.text_content": text_content }, { new: true })
                break
            case 'data/image':
                post = await Post.findOneAndUpdate({ _id: postId }, { "image_data.captition": captition }, { new: true })
                break
            case 'data/video':
                post = await Post.findOneAndUpdate({ _id: postId }, { "video_data.captition": captition }, { new: true })
            break
            default:
                res.status(404).json({ status: 404, message: 'dataType not found --- dataType = ' + dataType })
        }

        res.status(200).json({ status: 200, message: 'post is updated successfuly' })

    } catch (error) {
        console.log("### Update Post Error ###")
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        
        Post.findOneAndDelete({ _id: postId }, {}, (err, data) => {
            if ( err ) {
                console.log(err)
                res.status(400).json({ status: 400, message: "there is an error" })
                return
            }

            res.status(200).json({ status: 200, message: 'post is deleted successfuly' })
        })
    } catch (error) {
        console.log("### Delete Post Error ###")
        console.log(error)
    }
}

const addLike = async (req, res) => {
    try {
        const { update, postId, userId, type, newKey } = req.body
        var post

        if ( type === 'inc' ) {
            const ePath = `emotes.${update}`
            post = await Post.findByIdAndUpdate(postId, { $inc: { [ePath]: 1 }, $addToSet: { interactors: {userId, key: update} } }, { new: true })
        } else if ( type === 'dec' ) {
            const ePath = `emotes.${update.key}`
            post = await Post.findByIdAndUpdate(postId, { $inc: { [ePath]: -1 }, $pullAll: { interactors: [{userId: update.userId, key: update.key}] } }, { new: true })
        } else {
            const oep = `emotes.${update.key}`
            const nep = `emotes.${newKey}`

            post = await Post.findByIdAndUpdate(postId, { $inc: { [oep]: -1, [nep]: 1 }, interactors: { userId: update.userId, key: newKey } }, { new: true })
        }
        res.status(200).json({ message: 'like + one is successfuly' })
    } catch (error) {
        console.log("### Add_Like Post Error ###")
        console.log(error)
    }
}

module.exports = { createPost, updatePost, deletePost, getPosts, addLike }