import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, serverTimestamp, addDoc, setDoc, writeBatch } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

const userEmail = storageGetItem(storage.user)?.email;

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const addBatchInDictionary = createAsyncThunk(
  'addBatchInDictionary',
  async (fileName, thunkAPI) => {
    try {
      if (!userEmail) return;

      const response = await fetch(`/mockData/${fileName}.json`);
      const newData = await response.json();

      // const batch = writeBatch(firestore);
      console.log(newData);
      newData.forEach(async (item) => {
        console.log('word');
        const wordRef = doc(firestore, `dictionary-${userEmail}`, item.word);
        await setDoc(wordRef, {
          word: item.word,
          definition: [item.definition],
          progress: 0,
          createdAt: serverTimestamp()
        });
      });
      // const ref = doc(firestore, `dictionary-${userEmail}`, word);
      // await setDoc(ref, {
      //   word,
      //   definition: [definition],
      //   progress: 0,
      //   createdAt: serverTimestamp()
      // });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addBatchInDictionarySlice = createSlice({
  name: 'addInUserDictionarySlice',
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

export const selectorAddBatchInDictionary = (state) => state.addBatchInDictionarySlice;

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
