import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    userLogin: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userLoginError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.user = action.payload;
    },
    userLoginOut: (state) => {
      state.user = null;
      state.loading = false;
    }
  }
});

export const { userLogin, userLoginSuccess, userLoginError, userLoginOut } = userSlice.actions;

export const selectorUser = (state) => state.user;

export default userSlice.reducer;
