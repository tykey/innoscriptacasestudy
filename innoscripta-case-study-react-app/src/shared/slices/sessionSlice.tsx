import { createSlice } from '@reduxjs/toolkit'
import { User } from '../constants/types'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: -1,
  },
  reducers: {
    loginUser: (state, action: { payload: number; type: string }) => {
      state.value = action.payload
    },
    logoutUser: (state, _action) => {
      state.value = -1
    },
  },
})

export const { loginUser, logoutUser } = sessionSlice.actions

export default sessionSlice.reducer
