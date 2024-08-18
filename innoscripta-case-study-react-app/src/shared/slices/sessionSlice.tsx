import { createSlice } from '@reduxjs/toolkit'
import { User } from '../constants/types'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: null as User,
  },
  reducers: {
    loginUser: (state, action: { payload: User; type: string }) => {
      state.value = action.payload
    },
    logoutUser: (state, _action) => {
      state.value = null
    },
  },
})

export const { loginUser, logoutUser } = sessionSlice.actions

export default sessionSlice.reducer
