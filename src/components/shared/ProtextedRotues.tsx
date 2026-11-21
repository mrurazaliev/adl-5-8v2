import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

export default function ProtectedRoute() {
  const { status, accessToken } = useAppSelector((state) => state.auth)

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Проверка авторизации...
        </p>
      </div>
    )
  }

  if (status !== 'authenticated' || !accessToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}