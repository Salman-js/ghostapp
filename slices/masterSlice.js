import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import errorSlice from './errorSlice';

export const masterSlice = combineReducers({
  auth: authSlice,
  errors: errorSlice,
});
