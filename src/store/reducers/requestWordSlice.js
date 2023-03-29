import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: null,
  isLoading: false,
  error: false
};

export const getResult = createAsyncThunk('', async (word, thunkAPI) => {
  try {
    const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const response = await fetch(`${BASE_URL}${word}`);
    const data = await response.json();
    if (response.ok && data.length) {
      return data;
    } else {
      // getError(data);
      throw new Error('нет такого слова');
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

const requestWordSlice = createSlice({
  name: 'requestWord',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getResult.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getResult.fulfilled, (state, { payload }) => {
      state.results = payload;
      state.isLoading = false;
    });
    builder.addCase(getResult.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  }
});

export const selectorResult = (state) => state.result;

export default requestWordSlice.reducer;
