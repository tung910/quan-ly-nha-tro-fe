/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllService } from '~/api/service.api';
import { IService } from '~/types/Service.type';
interface TypeInitialState {
    value: IService[];
}
const initialState: TypeInitialState = {
    value: [],
};
export const fetchService = createAsyncThunk(
    'service/fetchService',
    async () => {
        const response = await getAllService();
        return response.data;
    }
);

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchService.fulfilled, (state, action) => {
            const { payload } = action;
            state.value = [...payload];
            return;
        });
    },
});
export const {} = serviceSlice.actions;
export default serviceSlice.reducer;
