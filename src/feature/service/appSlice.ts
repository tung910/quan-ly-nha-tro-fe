import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Store } from 'antd/lib/form/interface';

const initialState = {
    isLoading: false,
};

export const appSlice = createSlice({
    initialState,
    name: 'app/service',
    reducers: {
        setIsLoading: (state, action) => {
            return { ...state, isLoading: action.payload };
        },
    },
});

export const selectSelf = (state: Store) => state.appService;
export const appSelector = createSelector(selectSelf, (state) => state);
export const { setIsLoading } = appSlice.actions;
export default appSlice.reducer;
