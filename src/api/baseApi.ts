import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store'

export const baseApi = createApi({
  reducerPath: 'api',

  tagTypes: ['Contact', 'Debt', 'Dashboard', 'Payment'],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    cache: 'no-store',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState

      const token = state.auth.accessToken

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  endpoints: () => ({}),
})