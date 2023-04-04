import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const addBatchInDictionary = createAsyncThunk(
  'addBatchInDictionary',
  async ({ dictionary, fileName }, thunkAPI) => {
    console.log('addBatchInDictionary');
    try {
      const email = storageGetItem(storage.user)?.email;
      if (!email) return;

      const response = await fetch(`/public/mockData/${fileName}.json`);
      if (response.ok) {
        const newWords = await response.json();
        await setDoc(doc(firestore, `dictionary-${email}`, 'user-dictionary'), {
          dictionary: [...newWords, ...dictionary]
        });
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addBatchInDictionarySlice = createSlice({
  name: 'addInDictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addBatchInDictionary.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addBatchInDictionary.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(addBatchInDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorAddInDictionary = (state) => state.addBatchInDictionarySlice;

export default addBatchInDictionarySlice.reducer;

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
