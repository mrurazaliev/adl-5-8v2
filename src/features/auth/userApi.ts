import { baseApi } from '@/api/baseApi'
import type { AuthUser } from './authType'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<AuthUser, void>({
      query: () => '/api/users/me',
    }),
  }),
})

export const { useGetMeQuery } = userApi