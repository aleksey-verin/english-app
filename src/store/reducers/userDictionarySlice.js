// import { createSlice } from '@reduxjs/toolkit';
// import { storage, storageGetItem } from '../../utils/localstorage';

// const initialState = {
//   userDictionary: null,
//   // loading: false,
//   // error: null
// };

// export const userDictionarySlice = createSlice({
//   name: 'userDictionary',
//   initialState,
//   reducers: {
//     userLogin: (state, action) => {
//       state.loading = true;
//       state.error = null;
//     },
//     userLoginSuccess: (state, action) => {
//       state.user = action.payload;
//       state.loading = false;
//     },
//     userLoginError: (state, action) => {
//       state.loading = false;
//       state.error = true;
//       state.user = action.payload;
//     },
//     userLoginOut: (state) => {
//       state.user = null;
//       state.loading = false;
//     }
//   }
// });

// // export const { userLogin, userLoginSuccess, userLoginError, userLoginOut } = userDictionarySlice.actions;

// export const selectorUserDictionary = (state) => state.user;

// export default userDictionarySlice.reducer;
