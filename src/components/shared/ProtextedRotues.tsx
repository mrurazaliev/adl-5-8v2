import { Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/hooks'

export default function ProtectedRoute() {
  const { t } = useTranslation()
  const { status, accessToken } = useAppSelector((state) => state.auth)

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.checking')}
        </p>
      </div>
    )
  }

  if (status !== 'authenticated' || !accessToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
