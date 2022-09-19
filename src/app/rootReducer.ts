import { combineReducers } from '@reduxjs/toolkit';
import serviceSlice from '~/feature/service/serviceSlice';

const rootReducers = combineReducers({
    service: serviceSlice,
});
export default rootReducers;
