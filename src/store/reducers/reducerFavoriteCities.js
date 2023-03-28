import { storage, storageGetItem } from '../../storage/storage'
import { createSlice } from '@reduxjs/toolkit'

const initialState = storageGetItem(storage.weatherFavoriteList) ?? {
  favoriteCities: [],
}

export const favoriteCitiesSlice = createSlice({
  name: 'favoriteCities',
  initialState,
  reducers: {
    addToFavoriteCities: (state, action) => {
      state.favoriteCities.push(action.payload)
    },
    deleteFromFavoriteCities: (state, action) => {
      state.favoriteCities = state.favoriteCities.filter((item) => item !== action.payload)
    },

    clearAllFavoriteCities: (state, action) => {
      state.favoriteCities = action.payload
    },
  },
})

export default favoriteCitiesSlice.reducer

// const reducerFavoriteCities = (state = initialState, action) => {
//   switch (action.type) {
//     case ACTIONS.ADD_TO_FAVORITE_CITIES:
//       return { ...state, favoriteCities: [...state.favoriteCities, action.payload] }
//     case ACTIONS.DELETE_FROM_FAVORITE_CITIES:
//       return {
//         ...state,
//         favoriteCities: state.favoriteCities.filter((item) => item !== action.payload),
//       }
//     case ACTIONS.CLEAR_ALL_FAVORITE_CITIES:
//       return { ...state, favoriteCities: action.payload }
//     default:
//       return state
//   }
// }

// const reducerFavoriteCities = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addToFavorite, (state, action) => {
//       state.favoriteCities.push(action.payload)
//     })
//     .addCase(deleteFromFavorite, (state, action) => {
//       state.favoriteCities = state.favoriteCities.filter((item) => item !== action.payload)
//     })
//     .addCase(clearAllFavorite, (state, action) => {
//       state.favoriteCities = action.payload
//     })
// })
