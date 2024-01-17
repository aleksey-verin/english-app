import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';
import { getScore } from '../../utils/helpers';
import { generateTaskList } from '../../utils/training/trainingHelper';

const initialState = {
  userDictionary: [],
  trainingList: null,
  trainingListLength: null,
  userScore: {
    total: 0,
    done: 0,
    training: 0,
    percentages: {
      zero: 0,
      twenty: 0,
      forty: 0,
      sixty: 0,
      eighty: 0,
      hundred: 0
    }
  },
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getDictionary = createAsyncThunk('getDictionary', async (_, thunkAPI) => {
  // console.log('dictionaryDispatch');
  try {
    const email = storageGetItem(storage.user)?.email;
    if (!email) return;
    const docRef = doc(firestore, `dictionary-${email}`, 'user-dictionary');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().dictionary;
    } else {
      await setDoc(docRef, {
        dictionary: []
      });
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
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
  reducers: {
    setTrainingTasks(state, action) {
      state.trainingList = generateTaskList(action.payload);
    },
    clearAllUserData(state) {
      state.userDictionary = initialState.userDictionary;
      state.trainingList = initialState.trainingList;
      state.trainingListLength = initialState.trainingListLength;
      state.userScore = initialState.userScore;
      state.isLoading = initialState.isLoading;
      state.isSuccess = initialState.isSuccess;
      state.isError = initialState.isError;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDictionary.pending, (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getDictionary.fulfilled, (state, { payload }) => {
      const trainingList = generateTaskList(payload);
      state.userDictionary = payload;
      state.trainingList = trainingList;
      state.trainingListLength = trainingList ? trainingList.length : 0;
      state.userScore = getScore(payload);
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

// const { actions } = dictionarySlice;
export const { setTrainingTasks, clearAllUserData } = dictionarySlice.actions;

export default dictionarySlice.reducer;

// export const firestoreApi = createApi({
//   reducerPath: 'firestoreApi',
//   baseQuery: fakeBaseQuery(),
//   endpoints: (builder) => ({
//     fetchUserDictionary: builder.query({
//       async queryFn() {
//         try {
//           const ref = collection(firestore, `dictionary-${userEmail}`);
//           const querySnapshot = await getDocs(ref);
//           const userDictionary = [];
//           querySnapshot?.forEach((doc) => {
//             userDictionary.push(doc.data());
//           });
//           return { data: userDictionary };
//         } catch (error) {
//           return { error: error.message };
//         }
//       }
//     })
//   })
// });

// export const { useFetchUserDictionaryQuery, useSetNewHighScoreMutation } = firestoreApi;
// // const { data, isLoading, isSuccess, isError, error } = useFetchUserDictionaryQuery();
