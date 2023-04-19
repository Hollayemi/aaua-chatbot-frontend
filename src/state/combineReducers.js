import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import chatSlice from './slices/chat';

export const myReducers = combineReducers({
    loginReducer,
    chatSlice,
});
