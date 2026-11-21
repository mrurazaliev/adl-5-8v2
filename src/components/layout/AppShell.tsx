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
    <div className="min-h-svh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{t('appTitle')}</p>
            <p className="truncate text-xs text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <SidebarNavigation onNavigate={closeSidebar} />
        </div>
        <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
          {t('demoMode')}
        </div>
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 lg:hidden">
          <SheetHeader className="border-b border-sidebar-border p-5">
            <SheetTitle>{t('appTitle')}</SheetTitle>
            <SheetDescription>{t('subtitle')}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-3">
            <SidebarNavigation onNavigate={closeSidebar} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur lg:px-8">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={t('navigation')}
            onClick={() => dispatch(toggleSidebar())}
          >
            <Menu />
          </Button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{t('appTitle')}</p>
            <p className="truncate text-xs text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          <Select
            value={i18n.resolvedLanguage ?? 'ru'}
            onValueChange={(value) => void i18n.changeLanguage(value)}
          >
            <SelectTrigger size="sm" aria-label={t('language')} className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">RU</SelectItem>
              <SelectItem value="tj">TJ</SelectItem>
              <SelectItem value="en">EN</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t('toggleTheme')}
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <ProfileMenu />
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
