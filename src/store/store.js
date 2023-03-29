import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { storage, storageSetItem } from '../utils/localstorage';
import { firestoreApi } from './actions/userDictionaryAction';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer
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
