import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersSlice from '../slices/usersSlice'
import sessionSlice from '../slices/sessionSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducerUser = persistReducer(persistConfig, usersSlice)
const persistedReducerSession = persistReducer(persistConfig, sessionSlice)

const store = configureStore({
  reducer: {
    users: persistedReducerUser,
    session: persistedReducerSession,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type IRootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export default store
