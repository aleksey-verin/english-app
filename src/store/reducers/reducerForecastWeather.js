import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forecastWeather: [],
  loading: false,
  error: null
};

export const forecastWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    forecastFetching: (state, action) => {
      state.loading = true;
      state.error = initialState.error;
    },
    forecastFetchingSuccess: (state, action) => {
      state.loading = false;
      state.forecastWeather = action.payload;
    },
    forecastFetchingError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forecastResetError: (state, action) => {
      state.error = initialState.error;
    }
  }
});

export default forecastWeatherSlice.reducer;
