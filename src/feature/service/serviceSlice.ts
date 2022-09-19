/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createServiceAPI, getAllService } from '~/api/service.api';
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
        try {
            const response = await getAllService();
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
export const createService = createAsyncThunk(
    'service/createService',
    async (data: IService) => {
        try {
            const response = await createServiceAPI(data);
            return response.data;
        } catch (error) {
            return error;
        }
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
