import { createSlice } from '@reduxjs/toolkit';

export const systemMessageValues = {
  error_some: { type: 'error', message: 'Some error' },
  error_login: { type: 'error', message: 'Please log in to the app' },
  note_some: { type: 'note', message: 'Some notification' }
};

const initialState = {
  isVisible: false,
  type: null,
  message: null
};

const systemMessageSlice = createSlice({
  name: 'dictionarySlice',
  initialState,
  reducers: {
    setSystemMessage(state, { payload }) {
      state.isVisible = true;
      state.type = payload.type;
      state.message = payload.message;
    },
    hideSystemMessage(state) {
      state.isVisible = false;
      state.type = initialState.type;
      state.message = initialState.message;
    }
  }
});

export const selectorSystemMessage = (state) => state.systemMessageSlice;

export const { setSystemMessage, hideSystemMessage } = systemMessageSlice.actions;

export default systemMessageSlice.reducer;
