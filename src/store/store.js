import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { storage, storageSetItem } from '../utils/localstorage';
import addInUserDictionarySlice from './reducers/addInUserDictionarySlice';
import updateInUserDictionarySlice from './reducers/updateInUserDictionarySlice';
import requestWordSlice from './reducers/requestWordSlice';
// import { firestoreApi } from './reducers/userDictionaryApi';
import userDictionarySlice from './reducers/userDictionarySlice';
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
    userDictionarySlice,
    addInUserDictionarySlice,
    updateInUserDictionarySlice
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
