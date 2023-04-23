import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import adminReducer from './slices/auth/adminLogin';
import chatSlice from './slices/chat';

export const myReducers = combineReducers({
    loginReducer,
    adminReducer,
    chatSlice,
});
