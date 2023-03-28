import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice
  }
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherAPI.middleware),
});

// store.subscribe(() => {
//   storageSetItem(storage.weatherStats, store.getState().reducerStats)
//   storageSetItem(storage.weatherFavoriteList, store.getState().reducerFavoriteCities)
//   storageSetItem(storage.weatherCurrentCity, store.getState().reducerCurrentWeather.currentCity)
// })
