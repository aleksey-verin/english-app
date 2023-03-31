import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

const initialState = {
  userDictionary: null,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getDictionary = createAsyncThunk('getDictionary', async (_, thunkAPI) => {
  console.log('dictionaryDispatch');
  try {
    const email = storageGetItem(storage.user)?.email;
    console.log(email);
    if (!email) return;
    console.log('дальше в диспатче словаря', email);
    const docRef = doc(firestore, `dictionary-${email}`, 'user-dictionary');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data().dictionary);
      return docSnap.data().dictionary;
    } else {
      console.log('No such document! будем создавать');
      await setDoc(docRef, {
        dictionary: []
      });
      console.log('вроде создали');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('новый запрос словаря', docSnap.data().dictionary);
        return docSnap.data().dictionary;
      }
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

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
