import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

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
  async ({ dictionary, word, def, type }, thunkAPI) => {
    console.log('updateDispatch');
    try {
      const userEmail = storageGetItem(storage.user)?.email;
      // get current 'dictionary'
      // const docRef = doc(firestore, `dictionary-${userEmail}`, 'user-dictionary');
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      //   const dictionary = data.dictionary;

      const newData = JSON.parse(JSON.stringify(dictionary));
      let index;
      switch (type) {
        case updateTypes.addDefinition:
          index = newData.findIndex((item) => item.word === word);
          if (index !== -1) {
            newData[index].definition.push(def);
          }
          break;
        case updateTypes.removeDefinition:
          index = newData.findIndex((item) => item.word === word);
          if (index !== -1) {
            newData[index].definition = newData[index].definition.filter((item) => item !== def);
          }
          break;
        default:
          break;
      }
      await setDoc(doc(firestore, `dictionary-${userEmail}`, 'user-dictionary'), {
        dictionary: newData
      });
      // }
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
