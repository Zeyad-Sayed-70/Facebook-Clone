import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postApi from './postService'

export const createPost = createAsyncThunk('post/create', async (data, thunkApi) => {
    try {
        return postApi.createPost(data)
    } catch (error) {
        console.log("#### Create_Post_Error ###")
        console.log(thunkApi)
        // console.log(error)
    }
})

export const fetchPosts = createAsyncThunk('post/fetch', async (token, thunkApi) => {
    try {
        return postApi.fetchPosts(token)
    } catch (error) {
        console.log("#### Fetch_Post_Error ###")
        console.log(thunkApi)
        // console.log(error)
    }
})

export const updatePost = createAsyncThunk('post/update', async (data, thunkApi) => {
    try {
        return postApi.updatePost(data)
    } catch (error) {
        console.log("#### Update_Post_Error ###")
        console.log(thunkApi)
        // console.log(error)
    }
})

export const addLike = createAsyncThunk('post/update', async (data, thunkApi) => {
    try {
        return postApi.addLike(data)
    } catch (error) {
        console.log("#### Add_Like_Post_Error ###")
        console.log(thunkApi)
        // console.log(error)
    }
})

export const deletePost = createAsyncThunk('post/delete', async (data, thunkApi) => {
    try {
        if ( data.dataType === 'data/text' ) {
            postApi.deletePost(data)
        } else {
            postApi.deletePost(data)
            postApi.deleteFileBucket(data)
        }
    } catch (error) {
        console.log("#### Delete_Post_Error ###")
        console.log(thunkApi)
        // console.log(error)
    }
})

const initialState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        })
    }
})

export const {  } = postSlice.actions
export default postSlice