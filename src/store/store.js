import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { storage, storageSetItem } from '../utils/localstorage';
import addInDictionarySlice from './reducers/addInDictionarySlice';
import updateInDictionarySlice from './reducers/updateInDictionarySlice';
import requestWordSlice from './reducers/requestWordSlice';
import dictionarySlice from './reducers/dictionarySlice';
import userSlice from './reducers/userSlice';

// export const rootReducer = combineReducers({
//   userSlice,
//   requestWordSlice,
//   userDictionarySlice
// });

export const store = configureStore({
  reducer: {
    userSlice,
    requestWordSlice,
    dictionarySlice,
    addInDictionarySlice,
    updateInDictionarySlice
    // [firestoreApi.reducerPath]: firestoreApi.reducer
    // [requestWordApi.reducerPath]: requestWordApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
  // .concat(firestoreApi.middleware)
});

store.subscribe(() => {
  storageSetItem(storage.user, store.getState().userSlice.user);
});

// setupListeners(store.dispatch);
