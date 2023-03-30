import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  query,
  where,
  increment
} from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

const userEmail = storageGetItem(storage.user)?.email;

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const updateTypes = {
  addDefinition: 'addDefinition',
  removeDefinition: 'removeDefinition'
};

export const updateInDictionary = createAsyncThunk(
  'updateInDictionary',
  async ([dictionary, word, def, type], thunkAPI) => {
    console.log('updateDispatch');
    try {
      let newData = JSON.parse(JSON.stringify(dictionary));
      switch (type) {
        case updateTypes.addDefinition:
          newData = newData.map((item) => {
            if (item.word === word) {
              item.definition = [...item.definition, def];
            }
            return item;
          });
          break;
        case updateTypes.removeDefinition:
          newData = newData.map((item) => {
            if (item.word === word) {
              item.definition = item.definition.filter((item) => item !== def);
            }
            return item;
          });
          break;
        default:
          break;
      }
      await setDoc(doc(firestore, `dictionary-${userEmail}`, 'user-dictionary'), {
        dictionary: newData
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateInDictionarySlice = createSlice({
  name: 'updateInDictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateInDictionary.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateInDictionary.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(updateInDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorUpdateInDictionary = (state) => state.updateInDictionarySlice;

export default updateInDictionarySlice.reducer;

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
