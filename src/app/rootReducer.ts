import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '~/feature/service/appSlice';
import serviceSlice from '~/feature/service/serviceSlice';
import userSlice from '~/feature/user/userSlice';

const rootReducers = combineReducers({
    user: userSlice,
    service: serviceSlice,
    appService: appSlice,
});
export default rootReducers;
