import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersSlice from '../slices/usersSlice'
import sessionSlice from '../slices/sessionSlice'
import { User } from '../constants/types'
import { version } from 'os'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const rootReducer = combineReducers({
  usersSlice: usersSlice,
  sessionSlice: sessionSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type IRootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export default store
