import React from 'react';
import { Reducer } from '@reduxjs/toolkit';
declare type SliceToInitialState<Slice extends {
    name: PropertyKey;
    reducer: Reducer;
}> = {
    [K in Slice['name']]: ReturnType<Extract<Slice, {
        name: K;
    }>['reducer']>;
};
export declare function createStore<Name extends PropertyKey, Slices extends Array<{
    name: Name;
    reducer: Reducer;
}>>(slices: Slices | []): {
    StateProvider: React.FunctionComponent<{}>;
    useSelector: <T>(selector: (state: SliceToInitialState<Slices[number]>) => T) => T;
    useDispatch: () => (action: {
        payload: any;
        type: string;
    }) => void;
    Store: React.Context<{
        state: SliceToInitialState<Slices[number]>;
        dispatch: (action: {
            payload: any;
            type: string;
        }) => void;
    }>;
    initialState: SliceToInitialState<Slices[number]>;
    rootReducer: (state: SliceToInitialState<Slices[number]>, action: {
        payload: any;
        type: string;
    }) => SliceToInitialState<Slices[number]>;
};
export { createSlice, PayloadAction } from '@reduxjs/toolkit';
