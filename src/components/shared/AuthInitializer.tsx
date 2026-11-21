import { useEffect, type ReactNode } from 'react'

import { store } from '@/app/store'
import { authApi } from '@/features/auth/authApi'
import { userApi } from '@/features/auth/userApi'

import {
  clearCredentials,
  setAccessToken,
  setCredentials,
} from '@/features/auth/authSlice'

interface AuthInitializerProps {
  children: ReactNode
}

let restorePromise: Promise<void> | null = null

function restoreSession() {
  if (restorePromise) {
    return restorePromise
  }

  restorePromise = (async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        store.dispatch(clearCredentials())
        return
      }

      const response = await store
        .dispatch(
          authApi.endpoints.refresh.initiate({
            refreshToken,
          }),
        )
        .unwrap()

      localStorage.setItem('refreshToken', response.refreshToken)

      store.dispatch(setAccessToken(response.accessToken))

      const user = await store
        .dispatch(
          userApi.endpoints.getMe.initiate(undefined, {
            forceRefetch: true,
            subscribe: false,
          }),
        )
        .unwrap()

      store.dispatch(
        setCredentials({
          user,
          accessToken: response.accessToken,
        }),
      )
    } catch {
      localStorage.removeItem('refreshToken')
      store.dispatch(clearCredentials())
      store.dispatch(authApi.util.resetApiState())
    }
  })()

  restorePromise.finally(() => {
    restorePromise = null
  })

  return restorePromise
}

export default function AuthInitializer({
  children,
}: AuthInitializerProps) {
  useEffect(() => {
    void restoreSession()
  }, [])

  return <>{children}</>
}