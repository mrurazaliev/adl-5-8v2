import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Archive,
  CreditCard,
  Folder,
  LayoutDashboard,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  to: string
  labelKey: string
  icon: LucideIcon
}

const items: NavigationItem[] = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/debts', labelKey: 'nav.debts', icon: CreditCard },
  { to: '/contacts', labelKey: 'nav.contacts', icon: Users },
  { to: '/folders', labelKey: 'nav.folders', icon: Folder },
  { to: '/archive', labelKey: 'nav.archive', icon: Archive },
  { to: '/profile', labelKey: 'pages.profile.title', icon: UserRound },
]

interface SidebarNavigationProps {
  onNavigate?: () => void
  className?: string
}

export function SidebarNavigation({
  onNavigate,
  className,
}: SidebarNavigationProps) {
  const { t } = useTranslation()

  return (
    <nav className={cn('flex flex-col gap-1.5', className)} aria-label={t('navigation')}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/dashboard'}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'sidebar-link flex min-h-11 items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold transition-[color,background-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground',
            )
          }
        >
          <item.icon className="size-[18px] shrink-0" />
          <span className="min-w-0 break-words">{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
