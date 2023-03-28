import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  forecastWeather: [],
  loading: false,
  error: null,
}

export const forecastWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    forecastFetching: (state, action) => {
      state.loading = true
      state.error = initialState.error
    },
    forecastFetchingSuccess: (state, action) => {
      state.loading = false
      state.forecastWeather = action.payload
    },
    forecastFetchingError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    forecastResetError: (state, action) => {
      state.error = initialState.error
    },
  },
})

export default forecastWeatherSlice.reducer

// const reducerForecastWeather = (state = initialState, action) => {
//   switch (action.type) {
//     case forecastActionTypes.FETCH_FORECAST:
//       return { ...state, loading: true, error: null }
//     case forecastActionTypes.FETCH_FORECAST_SUCCESS:
//       return { ...state, loading: false, forecastWeather: action.payload }
//     case forecastActionTypes.FETCH_FORECAST_ERROR:
//       return { ...state, loading: false, error: action.payload }
//     case forecastActionTypes.RESET_FORECAST_ERROR:
//       return { ...state, error: initialState.error }
//     default:
//       return state
//   }
// }

// export default reducerForecastWeather
