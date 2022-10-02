import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '~/api/auth.api';
import { IUser } from '~/types/User.type';
export const signIn = createAsyncThunk('auth/login', async (user: IUser) => {
    try {
        const res = await loginApi(user);

        return res;
    } catch (error) {
        return error;
    }
});
const initialState = {
    user: {},
};
export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, payload) => {
            return {
                ...state,
                user: payload,
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(signIn.fulfilled, (state, action) => {
            console.log({ state, action });
        });
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
