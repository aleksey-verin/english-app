import { createSlice } from '@reduxjs/toolkit';
import { storage, storageGetItem } from '../../utils/localstorage';

const initialState = {
  user: storageGetItem(storage.user) ?? null,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
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
