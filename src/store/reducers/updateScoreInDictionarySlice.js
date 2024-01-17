import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localstorage';

export const scoreValues = {
  light: 10,
  medium: 20
};

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false
};

// export const updateTypes = {
//   addDefinition: 'addDefinition',
//   removeDefinition: 'removeDefinition'
// };

export const updateScoreInDictionary = createAsyncThunk(
  'updateScoreInDictionary',
  async ({ userDictionary, userRightAnswers, score }, thunkAPI) => {
    // console.log('updateDispatch');
    try {
      if (!userRightAnswers) return console.log('no answers');
      if (!userRightAnswers.length) return console.log('answers is empty');
      const email = storageGetItem(storage.user)?.email;

      const newDictionary = JSON.parse(JSON.stringify(userDictionary));
      userRightAnswers.forEach(({ indexInMainDictionary }) => {
        newDictionary[indexInMainDictionary].progress += score;
      });

      await setDoc(doc(firestore, `dictionary-${email}`, 'user-dictionary'), {
        dictionary: newDictionary
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateScoreInDictionarySlice = createSlice({
  name: 'updateScoreInDictionarySlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateScoreInDictionary.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateScoreInDictionary.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(updateScoreInDictionary.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorUpdateInDictionary = (state) => state.updateScoreInDictionarySlice;

export default updateScoreInDictionarySlice.reducer;
