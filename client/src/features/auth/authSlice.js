import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from './authService'

export const fetchAllUsersAuth = createAsyncThunk('auth/fetchAll', async (token) => {
    try {
        return authAPI.fetchAllUsersAuth(token)
    } catch (error) {
        console.log("### Fetch_All_Users_Auth Error ###")
        console.log(error)
    }
})

export const fetchUserAuth = createAsyncThunk('auth/fetch', async (data) => {
    try {
        return authAPI.fetchUserAuth(data)
    } catch (error) {
        console.log("### Fetch_User_Auth Error ###")
        console.log(error)
    }
})

export const postUserAuth = createAsyncThunk('auth/post', async (userData) => {
    try {
        return authAPI.postUserAuth(userData)
    } catch (error) {
        console.log("### Post_User_Auth Error ###")
        console.log(error)
    }
})

export const deleteUserAuth = createAsyncThunk('auth/delete', async (userId, token) => {
    try {
        return authAPI.deleteUserAuth(userId, token)
    } catch (error) {
        console.log("### Delete_User_Auth Error ###")
        console.log(error)
    }
})

export const updateUserAuth = createAsyncThunk('auth/update', async (data) => {
    try {
        return authAPI.updateUserAuth(data)
    } catch (error) {
        console.log("### Update_User_Auth Error ###")
        console.log(error)
    }
})

export const loginAuth = createAsyncThunk('auth/login', async (userData) => {
    try {
        return authAPI.loginAuth(userData)
    } catch (error) {
        console.log("### Login Error ###")
        console.log(error)
    }
})

export const uploadAvatar = createAsyncThunk('auth/avatar', async (data) => {
    try {
        return authAPI.uploadAvatar(data)
    } catch (error) {
        console.log("### upload avatar Error ###")
        console.log(error)
    }
})

const initialState = {
    data: null,
    isLoading: false,
    isSuccess: false,
    isError: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsersAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllUsersAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        }).addCase(fetchAllUsersAuth.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        }).addCase(postUserAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(postUserAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        }).addCase(postUserAuth.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        }).addCase(loginAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(loginAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        }).addCase(loginAuth.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        }).addCase(fetchUserAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchUserAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        }).addCase(fetchUserAuth.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        }).addCase(uploadAvatar.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
        })
    }
})


export const { } =  authSlice.actions
export default authSlice