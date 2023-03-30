import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';
const userEmail = storageGetItem(storage.user)?.email;

const initialState = {
  userDictionary: null,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getDictionary = createAsyncThunk(
  'getDictionary',
  async (email = userEmail, thunkAPI) => {
    console.log('dictionaryDispatch');
    try {
      if (!userEmail) return;
      const docRef = doc(firestore, `dictionary-${email}`, 'user-dictionary');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().dictionary;
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const dictionarySlice = createSlice({
  name: 'dictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDictionary.pending, (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getDictionary.fulfilled, (state, { payload }) => {
      state.userDictionary = payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorDictionary = (state) => state.dictionarySlice;

export default dictionarySlice.reducer;

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
