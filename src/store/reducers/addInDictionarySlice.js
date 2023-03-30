import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, serverTimestamp, addDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

const userEmail = storageGetItem(storage.user)?.email;

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const addInDictionary = createAsyncThunk(
  'addInDictionary',
  async ([dictionary, word, definition], thunkAPI) => {
    console.log('addInDictionaryDispatch');
    const newData = [
      {
        word,
        definition: [definition],
        progress: 0
      },
      ...dictionary
    ];
    console.log(newData);
    try {
      await setDoc(doc(firestore, `dictionary-${userEmail}`, 'user-dictionary'), {
        dictionary: newData
      });

      // if (!userEmail) return;
      // console.log('start');
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

const addInDictionarySlice = createSlice({
  name: 'addInDictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addInDictionary.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addInDictionary.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(addInDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorAddInDictionary = (state) => state.addInDictionarySlice;

export default addInDictionarySlice.reducer;

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
