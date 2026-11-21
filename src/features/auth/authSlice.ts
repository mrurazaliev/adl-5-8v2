import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from './authType'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  status: AuthStatus
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'checking',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser
        accessToken: string
      }>,
    ) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.status = 'authenticated'
    },

    setChecking: (state) => {
      state.status = 'checking'
    },

    clearCredentials: (state) => {
      state.user = null
      state.accessToken = null
      state.status = 'unauthenticated'
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
  state.accessToken = action.payload
  },
  },
})

export const {
  setCredentials,
  setAccessToken,
  setChecking,
  clearCredentials,
} = authSlice.actions

export default authSlice.reducer