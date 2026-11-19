import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleTheme } from '@/features/ui/uiSlice'

function App() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl tracking-tight">
            {t('appTitle')}
          </CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" onClick={() => dispatch(toggleTheme())}>
            {t('toggleTheme')}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default App
