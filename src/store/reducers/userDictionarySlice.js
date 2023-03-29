import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';
const userEmail = storageGetItem(storage.user)?.email;

const initialState = {
  userDictionary: null,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getUserDictionary = createAsyncThunk(
  'getUserDictionary',
  async (email = userEmail, thunkAPI) => {
    try {
      if (!userEmail) return;
      const ref = collection(firestore, `dictionary-${email}`);
      const querySnapshot = await getDocs(ref);
      const userDictionary = [];
      querySnapshot?.forEach((doc) => {
        userDictionary.push(doc.data());
      });
      console.log(userDictionary);
      return userDictionary;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userDictionarySlice = createSlice({
  name: 'userDictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserDictionary.pending, (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getUserDictionary.fulfilled, (state, { payload }) => {
      state.userDictionary = payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getUserDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorDictionary = (state) => state.userDictionarySlice;

export default userDictionarySlice.reducer;

// export const firestoreApi = createApi({
//   reducerPath: 'firestoreApi',
//   baseQuery: fakeBaseQuery(),
//   endpoints: (builder) => ({
//     fetchUserDictionary: builder.query({
//       async queryFn() {
//         try {
//           // console.log(user);
//           const ref = collection(firestore, `dictionary-${userEmail}`);
//           const querySnapshot = await getDocs(ref);
//           const userDictionary = [];
//           querySnapshot?.forEach((doc) => {
//             userDictionary.push(doc.data());
//           });
//           return { data: userDictionary };
//         } catch (error) {
//           console.error(error.message);
//           return { error: error.message };
//         }
//       }
//     })
//   })
// });

// export const { useFetchUserDictionaryQuery, useSetNewHighScoreMutation } = firestoreApi;
// // const { data, isLoading, isSuccess, isError, error } = useFetchUserDictionaryQuery();
