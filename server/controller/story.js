const StoryModel = require('../models/story')
const UsersAuth = require('../models/usersAuth')

const createStory = async (req, res) => {
    try {
        const image = req.file
        const { creatorId, text } = req.body

        // console.log(JSON.parse(text))

        const Story = await StoryModel.create({
            creatorId,
            story: image ? `http://localhost:5000/uploads/stories/${image.filename}` : JSON.parse(text),
            method: image ? 'image' : 'text'
        })

        res.status(200).json({ status: 200, message: 'created story is successfuly', data: Story })

    } catch (error) {
        console.log("### Create_Story_Error ###")
        console.log(error)
    }
}

const fetchStory = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UsersAuth.findById(userId).select({friends: 1})

        let friendsIds = []
        for ( let i in user?.friends ) {
            // friendsIds.push(user.friends[i]._id)
            friendsIds.push(user.friends[i])
        }
        
        if ( friendsIds.length === 0 ) {
            res.status(200).json({ status: 404,  message: 'not found any stories' })
            return
        }

        const icons = await UsersAuth.find({ _id: [...friendsIds, userId] }).select({avatar: 1, firstName: 1, surname: 1})
        const stories = await StoryModel.find({ creatorId: [...friendsIds, userId] })
        
        let combineData = []
        
        const storiesHash = {}
        for ( let x of stories ) {
            storiesHash[x.creatorId] ? storiesHash[x.creatorId].push(x) : storiesHash[x.creatorId] = [x]
        }
        
        for ( let x of icons ) {
            if ( storiesHash[x._id] !== undefined ) {
                const fullStory = {
                    user: x,
                    stories: storiesHash[x._id],
                }
                
                combineData.push(fullStory)
            }
        }
        
        res.status(200).json({ message: 'fetch story is successfuly', data: combineData, })

    } catch (error) {
        console.log("### Fetch_Story_Error ###")
        console.log(error)
    }
}

const deleteStory = async (req, res) => {
    try {
        const { storyId } = req.params
        await StoryModel.findByIdAndDelete(storyId)
        res.status(200).json({ message: 'delete story is successfuly' })
    } catch (error) {
        console.log("### Delete_Story_Error ###")
        console.log(error)
    }
}

module.exports = { createStory, fetchStory, deleteStory }