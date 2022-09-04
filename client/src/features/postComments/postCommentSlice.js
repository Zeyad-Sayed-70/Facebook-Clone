import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postCommentsAPI from './postCommentsService' 

export const fetchComments = createAsyncThunk('postComments/Fetch', 
    async (data, thunkAPI) => {
        try {
            return await postCommentsAPI.fetchComments(data)
        } catch (error) {
            console.log("### Fetch_Comments_Error ###")
            console.log(thunkAPI)
        }
    })

export const createComment = createAsyncThunk('postComments/Create', 
    async (data, thunkAPI) => {
        try {
            return await postCommentsAPI.createComment(data)
        } catch (error) {
            console.log("### Create_Comment_Error ###")
            console.log(thunkAPI)
        }
    })

const initialState = {
    comments: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const postCommentSlice = createSlice({
    name: 'pcom',
    initialState,
    reducers: {
        reset(state) {
            state.comments = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.comments = []
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // console.log(action.payload, 'payload')
            state.comments = action.payload
        })
    }
})

export const { reset } = postCommentSlice.actions
export default postCommentSlice 