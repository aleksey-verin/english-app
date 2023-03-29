import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { storage, storageSetItem } from '../utils/localstorage';

import requestWordSlice from './reducers/requestWordSlice';
import { firestoreApi } from './reducers/userDictionaryApi';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    result: requestWordSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer
    // [requestWordApi.reducerPath]: requestWordApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(firestoreApi.middleware)
});

store.subscribe(() => {
  storageSetItem(storage.user, store.getState().user.user);
});

setupListeners(store.dispatch);
