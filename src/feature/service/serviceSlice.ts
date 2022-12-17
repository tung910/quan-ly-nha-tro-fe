/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createServiceAPI,
    deleteServiceAPI,
    getAllService,
    updateServiceAPI,
} from '~/api/service.api';
import { IService } from '~/types/Service.type';

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
export const deleteService = createAsyncThunk(
    'service/deleteService',
    async (data: { data: React.Key[] }) => {
        try {
            await deleteServiceAPI(data);
            const response = await getAllService();
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
export const updateService = createAsyncThunk(
    'service/updateService',
    async (data: IService) => {
        try {
            const response = await updateServiceAPI(data, data._id);
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
interface TypeInitialState {
    value: IService[];
}
const initialState: TypeInitialState = {
    value: [],
};
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
        builder.addCase(deleteService.fulfilled, (state, action) => {
            const { payload } = action;
            state.value = [...payload];
            return;
        });
    },
});
export const {} = serviceSlice.actions;
export default serviceSlice.reducer;
