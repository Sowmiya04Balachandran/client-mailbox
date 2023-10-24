import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('endpoint') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.endpoint;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('endpoint', action.payload.endpoint);
    },
    logout: (state) => {
      state.token = null;
      state.email = '';
      localStorage.removeItem('token');
      localStorage.removeItem('endpoint');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
