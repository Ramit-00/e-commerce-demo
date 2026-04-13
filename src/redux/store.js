import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userSlice from "./userSlice"

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import rawStorage from 'redux-persist/lib/storage'

// redux-persist exports default as ESM, and bundlers can sometimes place it under .default
const storage = rawStorage && rawStorage.default ? rawStorage.default : rawStorage

const persistConfig = {
  key: 'e-kart',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = configureStore({   // not needed anymore because we are using persistReducer (reducer: persistedReducer)
// })
//   reducer: {
//     user:userSlice
//   }
// })

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store