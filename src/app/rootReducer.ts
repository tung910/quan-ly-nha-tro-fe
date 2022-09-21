import { combineReducers } from '@reduxjs/toolkit';
import serviceSlice from '~/feature/service/serviceSlice';
import userSlice from '~/feature/user/userSlice';

const rootReducers = combineReducers({
    user: userSlice,
    service: serviceSlice,
});
export default rootReducers;
