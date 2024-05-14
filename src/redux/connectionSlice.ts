// src/redux/connectionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectionSliceState, ConnectionState } from '../types';

const initialState: ConnectionSliceState = {
    connectionState: 'disconnected',
};

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setConnectionState: (state, action: PayloadAction<ConnectionState>) => {
            state.connectionState = action.payload;
        },
    },
});

export const { setConnectionState } = connectionSlice.actions;
export default connectionSlice.reducer;
