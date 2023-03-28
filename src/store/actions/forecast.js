// export const forecastActionTypes = {
//   FETCH_FORECAST: 'FETCH_FORECAST',
//   FETCH_FORECAST_SUCCESS: 'FETCH_FORECAST_SUCCESS',
//   FETCH_FORECAST_ERROR: 'FETCH_FORECAST_ERROR',
//   RESET_FORECAST_ERROR: 'RESET_FORECAST_ERROR',
// }

import { forecastWeatherSlice } from '../reducers/reducerForecastWeather'

// export const fetchForecast = (payload) => {
//   return {
//     type: forecastActionTypes.FETCH_FORECAST,
//     payload,
//   }
// }
// export const fetchForecastSuccess = (payload) => {
//   return {
//     type: forecastActionTypes.FETCH_FORECAST_SUCCESS,
//     payload,
//   }
// }
// export const fetchForecastError = (payload) => {
//   return {
//     type: forecastActionTypes.FETCH_FORECAST_ERROR,
//     payload,
//   }
// }
// export const resetForecastSuccess = () => {
//   return {
//     type: forecastActionTypes.RESET_FORECAST_ERROR,
//   }
// }

export const requestForecast = (cityName) => {
  const { forecastFetching, forecastFetchingSuccess, forecastFetchingError, forecastResetError } =
    forecastWeatherSlice.actions

  const apiKey = '7510f7f4f850f3de4ccfa3409edd947b'
  const serverUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast'
  const urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}&lang=ru`

  return async (dispatch) => {
    try {
      dispatch(forecastFetching())
      const response = await fetch(urlForecast)
      if (response.ok) {
        const data = await response.json()
        const forecast = transformForecast(data)
        dispatch(forecastFetchingSuccess(forecast))
      } else {
        dispatch(forecastFetchingError(response.status))
        setTimeout(() => {
          dispatch(forecastResetError())
        }, 2000)
      }
    } catch (error) {
      dispatch(forecastFetchingError(error))
      setTimeout(() => {
        dispatch(forecastResetError())
      }, 2000)
    }
  }
}

const transformForecast = (dataForecast) => {
  return dataForecast.list
}
