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
    // console.log('updateDispatch');
    try {
      const email = storageGetItem(storage.user)?.email;

      let newDictionary = JSON.parse(JSON.stringify(dictionary));
      let index;
      switch (type) {
        case updateTypes.addDefinition:
          index = newDictionary.findIndex((item) => item.word === word);
          if (index !== -1) {
            newDictionary[index].definition.push(def);
          }
          break;
        case updateTypes.removeDefinition:
          index = newDictionary.findIndex((item) => item.word === word);
          if (index !== -1) {
            newDictionary[index].definition = newDictionary[index].definition.filter(
              (item) => item !== def
            );
            if (!newDictionary[index].definition.length) {
              newDictionary = newDictionary.filter((item) => item.word !== word);
            }
          }
          break;
        default:
          break;
      }

      await setDoc(doc(firestore, `dictionary-${email}`, 'user-dictionary'), {
        dictionary: newDictionary
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
