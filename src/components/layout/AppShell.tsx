import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Moon, Sparkles, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ProfileMenu } from '@/components/layout/ProfileMenu'
import { SidebarNavigation } from '@/components/layout/SidebarNavigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { setSidebarOpen, toggleSidebar, toggleTheme } from '@/features/ui/uiSlice'

export function AppShell() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const closeSidebar = () => dispatch(setSidebarOpen(false))

  return (
    <div className="app-shell min-h-svh min-w-0 bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-58 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex min-h-24 items-center gap-3 px-6 py-5">
          <span className="brand-mark grid size-9 shrink-0 place-items-center rounded-[11px] text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold tracking-tight">ADL 5:8</p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3.5 pb-6">
          <SidebarNavigation onNavigate={closeSidebar} />
        </div>
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 max-w-[calc(100%-2rem)] gap-5 border-sidebar-border bg-sidebar p-0 lg:hidden">
          <SheetHeader className="border-b border-sidebar-border px-6 py-7">
            <SheetTitle className="text-xl font-extrabold tracking-tight">ADL 5:8</SheetTitle>
            <SheetDescription>{t('subtitle')}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-3.5 pb-6">
            <SidebarNavigation onNavigate={closeSidebar} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="min-w-0 lg:pl-58">
        <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center gap-2 border-b border-border/60 bg-background/85 px-4 py-4 backdrop-blur-xl sm:gap-3 sm:px-6 lg:px-8">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="border border-border bg-card lg:hidden"
            aria-label={t('navigation')}
            onClick={() => dispatch(toggleSidebar())}
          >
            <Menu />
          </Button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold tracking-tight">ADL 5:8 <span className="text-primary-light">V2</span></p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              {t('subtitle')}
            </p>
          </div>

          <Select
            value={i18n.resolvedLanguage ?? 'ru'}
            onValueChange={(value) => void i18n.changeLanguage(value)}
          >
            <SelectTrigger size="sm" aria-label={t('language')} className="w-[4.5rem] rounded-full bg-card text-xs font-bold">
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

          <ProfileMenu />
        </header>

        <main className="mx-auto w-full min-w-0 max-w-[1600px] px-4 pt-6 pb-24 sm:px-6 sm:pt-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
