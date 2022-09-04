import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import storyAPIs from './storyService'

export const fetchStory = createAsyncThunk('story/fetch', async (data) => {
    try {
        return await storyAPIs.fetchStory(data)
    } catch (error) {
        console.log("### Fetch_Story_Error ###")
        console.log(error)
    }
})
export const createStory = createAsyncThunk('story/create', async (data) => {
    try {
        return await storyAPIs.createStory(data)
    } catch (error) {
        console.log("### create_Story_Error ###")
        console.log(error)
    }
})
export const deleteStory = createAsyncThunk('story/delete', async (data) => {
    try {
        return await storyAPIs.deleteStory(data)
    } catch (error) {
        console.log("### delete_Story_Error ###")
        console.log(error)
    }
})

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStory.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchStory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        }).addCase(createStory.pending, (state) => {
            state.isLoading = true
        }).addCase(createStory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        }).addCase(deleteStory.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteStory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        })
    }
})

export const {} = storySlice.actions
export default storySlice