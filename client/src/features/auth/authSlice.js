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

export const fetchUserAuth = createAsyncThunk('auth/fetch', async (method, user, token) => {
    try {
        return authAPI.fetchUserAuth(method, user, token)
    } catch (error) {
        console.log("### Fetch_All_Users_Auth Error ###")
        console.log(error)
    }
})

export const postUserAuth = createAsyncThunk('auth/post', async (userData) => {
    try {
        return authAPI.postUserAuth(userData)
    } catch (error) {
        console.log("### Fetch_All_Users_Auth Error ###")
        console.log(error)
    }
})

export const deleteUserAuth = createAsyncThunk('auth/delete', async (userId, token) => {
    try {
        return authAPI.deleteUserAuth(userId, token)
    } catch (error) {
        console.log("### Fetch_All_Users_Auth Error ###")
        console.log(error)
    }
})

export const updateUserAuth = createAsyncThunk('auth/update', async (userId, userData, token) => {
    try {
        return authAPI.updateUserAuth(userId, userData, token)
    } catch (error) {
        console.log("### Fetch_All_Users_Auth Error ###")
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
        })
    }
})


export const { } =  authSlice.actions
export default authSlice