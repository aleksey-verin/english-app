import { convertKelvinToCelsius, convertTimestampToTime } from '../../services/helpers'
import { currentWeatherSlice } from '../reducers/reducerCurrentWeather'

export const requestWeather = (cityName) => {
  const { weatherFetching, weatherFetchingSuccess, weatherFetchingError, weatherResetError } =
    currentWeatherSlice.actions

  const serverUrlWeather = 'https://api.openweathermap.org/data/2.5/weather'
  const apiKey = '7510f7f4f850f3de4ccfa3409edd947b'
  const urlWeather = `${serverUrlWeather}?q=${cityName}&appid=${apiKey}&lang=ru`

  return async (dispatch) => {
    try {
      dispatch(weatherFetching())
      const response = await fetch(urlWeather)
      if (response.ok) {
        const data = await response.json()
        const weather = transformWeather(data)
        dispatch(weatherFetchingSuccess(weather))
      } else {
        dispatch(weatherFetchingError(response.status))
        setTimeout(() => {
          dispatch(weatherResetError())
        }, 2000)
      }
    } catch (error) {
      dispatch(weatherFetchingError(error))
      setTimeout(() => {
        dispatch(weatherResetError())
      }, 2000)
    }
  }
}

export const transformWeather = (data) => {
  return {
    cityName: data.name,
    feelsLike: convertKelvinToCelsius(data.main.feels_like),
    temp: convertKelvinToCelsius(data.main.temp),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: convertTimestampToTime(data.sys.sunrise, data.timezone),
    sunset: convertTimestampToTime(data.sys.sunset, data.timezone),
    timezone: data.timezone,
  }
}
