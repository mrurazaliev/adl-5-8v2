import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toggleTheme } from '@/features/ui/uiSlice'

export function PublicHeader() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 px-4 py-4 sm:min-h-20 sm:flex-nowrap sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="brand-mark grid size-9 shrink-0 place-items-center rounded-[11px] text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold tracking-tight">
              ADL 5:8
            </span>
            <span className="hidden truncate text-xs text-muted-foreground sm:block">
              {t('subtitle')}
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Select
            value={i18n.resolvedLanguage ?? 'ru'}
            onValueChange={(value) => void i18n.changeLanguage(value)}
          >
            <SelectTrigger
              size="sm"
              aria-label={t('language')}
              className="w-[4.5rem] rounded-full bg-card text-xs font-bold"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" align="end">
              <SelectItem value="ru">RU</SelectItem>
              <SelectItem value="tj">TJ</SelectItem>
              <SelectItem value="en">EN</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
            aria-label={t('toggleTheme')}
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Link to="/login">{t('auth.login')}</Link>
          </Button>
          <Button asChild size="sm" className="flex-1 sm:flex-none">
            <Link to="/register">{t('auth.register')}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
