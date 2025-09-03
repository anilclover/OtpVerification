import counterReducer from '../slice/CounterSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});



// 🔹 Add these types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// apktool  d //Users/clover/Downloads/VegEase.apk