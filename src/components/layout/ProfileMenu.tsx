import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, UserRound } from 'lucide-react'
import { toast } from 'sonner'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { baseApi } from '@/api/baseApi'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogoutMutation } from '@/features/auth/authApi'
import { clearCredentials } from '@/features/auth/authSlice'

export function ProfileMenu() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logout, { isLoading }] = useLogoutMutation()

  const displayName = user?.name ?? t('pages.profile.user')
  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'
  const isBusy = isLoggingOut || isLoading

  async function handleLogout() {
    if (isBusy) {
      return
    }

    setIsLoggingOut(true)

    try {
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          await logout({ refreshToken }).unwrap()
        } catch {
          toast.error(
            t('pages.profile.logoutError'),
          )
        }
      }
    } finally {
      localStorage.removeItem('refreshToken')
      dispatch(clearCredentials())
      dispatch(baseApi.util.resetApiState())
      setIsLoggingOut(false)
      setOpen(false)
      navigate('/login', { replace: true })
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 gap-2 rounded-lg px-1.5 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring sm:px-2"
          aria-label={t('pages.profile.menu')}
        >
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>

          <span className="hidden max-w-28 truncate sm:inline">
            {displayName}
          </span>

          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border border-border/70 bg-popover p-2 shadow-lg"
      >
        <DropdownMenuLabel className="flex items-center gap-3 py-2">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.email ?? t('pages.profile.emailUnavailable')}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-2 rounded-lg px-2 py-2"
          onSelect={() => navigate('/profile')}
        >
          <UserRound className="size-4" />
          {t('pages.profile.title')}
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          className="gap-2 rounded-lg px-2 py-2"
          disabled={isBusy}
          onSelect={() => void handleLogout()}
        >
          <LogOut className="size-4" />
          {t(isBusy ? 'pages.profile.loggingOut' : 'pages.profile.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
