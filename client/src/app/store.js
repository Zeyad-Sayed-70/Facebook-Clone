import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import storySlice from '../features/story/storySlice'
import postSlice from '../features/posts/postSlice'
import postCommentSlice from '../features/postComments/postCommentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    story: storySlice.reducer,
    post: postSlice.reducer,
    pcom: postCommentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }), 
})
