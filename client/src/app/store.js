import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }), 
});
