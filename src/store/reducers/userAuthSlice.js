import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

export const userSign = {
  in: 'sighIn',
  out: 'sighOut'
};

const initialState = {
  user: storageGetItem(storage.user) ?? null,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const userAuth = createAsyncThunk('userAuth', async (typeSigh, thunkAPI) => {
  console.log('userAuth');
  try {
    if (typeSigh === userSign.in) {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const { email, uid, displayName, photoURL } = response.user;
      return {
        email,
        uid,
        displayName,
        photoURL
      };
    }
    if (typeSigh === userSign.out) {
      await auth.signOut();
      return null;
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userAuth.pending, (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(userAuth.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(userAuth.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorUserAuth = (state) => state.userAuthSlice;

export default userAuthSlice.reducer;

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
