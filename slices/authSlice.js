import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: null,
  searchString: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setLoadingFalse: (state, action) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
    },
    setSearch: (state, action) => {
      state.searchString = action.payload;
    },
    setLogout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setLoadingFalse,
  setUser,
  setAuthenticated,
  setSearch,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
