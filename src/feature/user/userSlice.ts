import { createSlice } from '@reduxjs/toolkit';
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
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
