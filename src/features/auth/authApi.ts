import { baseApi } from "@/api/baseApi";
import {type LoginRequest, type LoginResponse}  from "./authType";

export const authApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
      login:builder.mutation<LoginResponse, LoginRequest>({
        query:(body)=>({
            url:'/api/auth/login',
            method: 'POST',
            body,
        })
      })
    })
})
export const { useLoginMutation } = authApi