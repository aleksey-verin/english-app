import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalizeData } from '../../utils/normalizeData';

const initialState = {
  results: null,
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const requestWord = createAsyncThunk('requestWord', async (word, thunkAPI) => {
  try {
    // console.log('requestWord');
    const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const response = await fetch(`${BASE_URL}${word}`);
    const data = await response.json();
    if (response.ok && data.length) {
      return normalizeData(data);
    } else {
      throw new Error('нет такого слова');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const requestWordSlice = createSlice({
  name: 'requestWordSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(requestWord.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(requestWord.fulfilled, (state, { payload }) => {
      state.results = payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(requestWord.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    });
  }
});

export const selectorRequestWord = (state) => state.requestWordSlice;

export default requestWordSlice.reducer;
