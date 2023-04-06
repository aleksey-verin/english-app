import { configureStore } from '@reduxjs/toolkit';
import { storage, storageSetItem } from '../utils/localstorage';
import addInDictionarySlice from './reducers/addInDictionarySlice';
import updateInDictionarySlice from './reducers/updateInDictionarySlice';
import requestWordSlice from './reducers/requestWordSlice';
import dictionarySlice from './reducers/dictionarySlice';
import userAuthSlice from './reducers/userAuthSlice';
import systemMessageSlice from './reducers/systemMessageSlice';

export const store = configureStore({
  reducer: {
    userAuthSlice,
    requestWordSlice,
    dictionarySlice,
    addInDictionarySlice,
    updateInDictionarySlice,
    systemMessageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
  // .concat(firestoreApi.middleware)
});

store.subscribe(() => {
  storageSetItem(storage.user, store.getState().userAuthSlice.user);
});
