import { configureStore } from '@reduxjs/toolkit';
import { storage, storageSetItem } from '../utils/localstorage';
import addInDictionarySlice from './reducers/addInDictionarySlice';
import updateInDictionarySlice from './reducers/updateInDictionarySlice';
import requestWordSlice from './reducers/requestWordSlice';
import dictionarySlice from './reducers/dictionarySlice';
import trainingSlice from './reducers/trainingSlice';
// import userSlice from './reducers/userSlice';
import userAuthSlice from './reducers/userAuthSlice';

// export const rootReducer = combineReducers({
//   userSlice,
//   requestWordSlice,
//   userDictionarySlice
// });

export const store = configureStore({
  reducer: {
    // userSlice,
    userAuthSlice,
    requestWordSlice,
    dictionarySlice,
    addInDictionarySlice,
    updateInDictionarySlice,
    trainingSlice
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
  storageSetItem(storage.user, store.getState().userAuthSlice.user);
});
