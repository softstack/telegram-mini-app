// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import connectionReducer from './connectionSlice';

export const store = configureStore({
    reducer: {
        connection: connectionReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
