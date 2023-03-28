import { configureStore } from '@reduxjs/toolkit';
import { storage, storageSetItem } from '../utils/localstorage';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice
  }
});

store.subscribe(() => {
  storageSetItem(storage.user, store.getState().user.user);
});
