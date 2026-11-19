import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface UiState {
  theme: Theme
  sidebarOpen: boolean
}

const initialState: UiState = {
  theme: 'light',
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { setTheme, toggleTheme, setSidebarOpen, toggleSidebar } =
  uiSlice.actions

export default uiSlice.reducer
