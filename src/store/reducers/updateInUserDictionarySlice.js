import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, serverTimestamp, doc, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

const userEmail = storageGetItem(storage.user)?.email;

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const updateInUserDictionary = createAsyncThunk(
  'updateInUserDictionary',
  async (_, thunkAPI) => {
    console.log('edit');
    try {
      if (!userEmail) return;
      // const q = query(collection(firestore, `dictionary-${userEmail}`), where('word', '==', 'hot'));
      const ref = doc(firestore, `dictionary-${userEmail}`, '2J2MZuIOqYYH9FBqGssj');
      await updateDoc(ref, {
        progress: 20
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateInUserDictionarySlice = createSlice({
  name: 'updateInUserDictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateInUserDictionary.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateInUserDictionary.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(updateInUserDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorUpdateInDictionary = (state) => state.updateInUserDictionarySlice;

export default updateInUserDictionarySlice.reducer;

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
