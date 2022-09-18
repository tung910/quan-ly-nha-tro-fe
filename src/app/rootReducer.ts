import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '~/feature/user/userSlice';

const rootReducers = combineReducers({
    user: userSlice,
});
export default rootReducers;
