import { createSlice } from '@reduxjs/toolkit'
import { storage, storageGetItem } from '../../storage/storage'
// import { weatherActionTypes } from '../actions/weather'

const initialState = {
  currentWeather: {},
  currentCity: storageGetItem(storage.weatherCurrentCity) ?? 'Псков',
  loading: false,
  error: null,
}

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    weatherFetching: (state, action) => {
      state.loading = true
      state.error = initialState.error
    },
    weatherFetchingSuccess: (state, action) => {
      state.loading = false
      state.currentWeather = action.payload
      state.currentCity = action.payload.cityName
    },
    weatherFetchingError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    weatherResetError: (state, action) => {
      state.error = initialState.error
    },
  },
})

export default currentWeatherSlice.reducer

// const reducerCurrentWeather = (state = initialState, action) => {
//   switch (action.type) {
//     case weatherActionTypes.FETCH_WEATHER:
//       return { ...state, loading: true, error: null }
//     case weatherActionTypes.FETCH_WEATHER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         currentWeather: action.payload,
//         currentCity: action.payload.cityName,
//       }
//     case weatherActionTypes.FETCH_WEATHER_ERROR:
//       return { ...state, loading: false, error: action.payload }
//     case weatherActionTypes.RESET_WEATHER_ERROR:
//       return { ...state, error: initialState.error }
//     default:
//       return state
//   }
// }

// export default reducerCurrentWeather
