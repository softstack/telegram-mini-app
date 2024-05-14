// src/types/index.ts
export type ConnectionState =
    | 'disconnected'
    | 'connecting'
    | 'connected'
    | 'error'
    | 'retrying';

export interface ConnectionSliceState {
    connectionState: ConnectionState;
}
