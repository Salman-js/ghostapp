import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      return action.payload;
    },
    emptyErrors: (state, action) => {
      return {};
    },
  },
});

export const { setErrors, emptyErrors } = errorSlice.actions;

export default errorSlice.reducer;
