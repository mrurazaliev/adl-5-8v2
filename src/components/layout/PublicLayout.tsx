import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { PublicHeader } from '@/components/layout/PublicHeader'

export function PublicLayout() {
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
