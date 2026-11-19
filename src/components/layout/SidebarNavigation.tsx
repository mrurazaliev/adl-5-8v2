import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Archive,
  CreditCard,
  Folder,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
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
  { to: '/payments', labelKey: 'nav.payments', icon: Receipt },
  { to: '/users', labelKey: 'nav.users', icon: ShieldCheck },
  { to: '/archive', labelKey: 'nav.archive', icon: Archive },
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
    <nav className={cn('flex flex-col gap-1', className)} aria-label={t('navigation')}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/dashboard'}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
            )
          }
        >
          <item.icon className="size-4" />
          <span>{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
