import { baseApi } from "@/api/baseApi";
import type { LoginRequest, LoginResponse, RegisterRequest, RefreshRequest,  RefreshResponse, LogoutRequest, } from './authType'

export const authApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
      login:builder.mutation<LoginResponse, LoginRequest>({
        query:(body)=>({
            url:'/api/auth/login',
            method: 'POST',
            body,
        })
      }),
     register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
    }),

    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
  query: (body) => ({
    url: '/api/auth/refresh',
    method: 'POST',
    body,
  }),
}),

    logout: builder.mutation<void, LogoutRequest>({
      query: (body) => ({
        url: '/api/auth/logout',
        method: 'POST',
        body,
      }),
    }),
    })
})
export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutMutation, } = authApi
