import { createSlice } from '@reduxjs/toolkit'
import { SourceNewsAPIOrg, TheGuardianCategory, User } from '../constants/types'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [] as User[],
  },
  reducers: {
    addUser: (state, action: { payload: User; type: string }) => {
      state.value = state.value.concat(action.payload)
    },
    changeUserFilters: (
      state,
      action: {
        payload: {
          user: User
          sortBy?: string
          sources?: SourceNewsAPIOrg[]
          category?: TheGuardianCategory
        }
        type: string
      }
    ) => {
      const selectedUserIndex = state.value.findIndex(
        (user: User) => user.username === action.payload.user.username
      )

      if (selectedUserIndex > -1) {
        const selectedUser = state.value[selectedUserIndex]
        const oldPreferences = selectedUser.filterPreferences
        let newPreferences = oldPreferences

        if (action.payload.sortBy) newPreferences.sortBy = action.payload.sortBy
        if (action.payload.sources)
          newPreferences.sources = action.payload.sources
        if (action.payload.category)
          newPreferences.category = action.payload.category

        state.value = [
          ...state.value.slice(0, selectedUserIndex),
          {
            ...state.value[selectedUserIndex],
            filterPreferences: newPreferences,
          },
          ...state.value.slice(selectedUserIndex + 1),
        ]
      }
    },
  },
})

export const { addUser, changeUserFilters } = usersSlice.actions

export default usersSlice.reducer
