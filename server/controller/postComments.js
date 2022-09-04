const PostComments = require('../models/postComments')

const createComment = async (req, res) => {
    try {
        const { id, firstName, surname, avatar: avatar_url, userId, comment_content, postId, i_sender } = req.body
        PostComments.create({
            user_info: {
                firstName,
                surname,
                avatar_url,
                userId,
            },
            id,
            postId,
            comment_content,
            i_sender,
            date: new Date().getTime(),
        }, (err, comment) => {
            if ( err ) {
                res.status(400).json({ status: 400, message: "There is something wrong in Create PostComments Controller" })
                console.log(err)
                return
            }
            console.log(comment)
            res.status(200).json({ status: 200, message: "Create Comment is Successfuly" })
        })
    } catch (error) {
        console.log("### Create_Comment Post Error ###")
        console.log(error)  
    }
}

const fetchComments = async (req, res) => {
    try {
        const { postId } = req.params
        PostComments.find({ postId }, (err, comments) => {
            if ( err ) {
                res.status(400).json({ status: 400, message: "There is something wrong in Fetch PostComments Controller" })
                console.log(err)
                return
            }
            
            res.status(200).json({ status: 200, message: "Fetch Comments is Successfuly", response: comments })
        })
    } catch (error) {
        console.log("### Refresh_Comments Post Error ###")
        console.log(error)
    }
}

module.exports = { fetchComments, createComment }