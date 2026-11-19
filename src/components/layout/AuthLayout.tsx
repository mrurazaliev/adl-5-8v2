import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CreditCard, Receipt, Sparkles, Users, type LucideIcon } from 'lucide-react'

interface AuthHighlight {
  icon: LucideIcon
  labelKey: string
}

const highlights: AuthHighlight[] = [
  { icon: CreditCard, labelKey: 'auth.sideDebts' },
  { icon: Users, labelKey: 'auth.sideContacts' },
  { icon: Receipt, labelKey: 'auth.sidePayments' },
]

const sideGridStyle = {
  backgroundImage:
    'linear-gradient(to right, var(--primary-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--primary-foreground) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

const formGridStyle = {
  backgroundImage:
    'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

export function AuthLayout() {
  const { t } = useTranslation()

  return (
    <div className="grid min-h-[calc(100svh-8rem)] lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <aside className="relative hidden overflow-hidden bg-linear-to-br from-primary via-secondary to-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={sideGridStyle}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-primary-foreground/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-20 size-80 rounded-full bg-primary-foreground/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15 ring-1 ring-primary-foreground/20">
            <Sparkles className="size-5" />
          </span>
          <span className="text-base font-semibold">{t('appTitle')}</span>
        </div>

        <div className="relative max-w-lg">
          <h2 className="text-4xl leading-tight font-semibold">
            {t('auth.sideTitle')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
            {t('auth.sideDescription')}
          </p>
          <div className="mt-8 grid gap-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.labelKey}
                className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm"
              >
                <highlight.icon className="size-4 shrink-0" />
                <span className="text-sm font-medium">{t(highlight.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-primary-foreground/70">
          {t('demoMode')}
        </p>
      </aside>

      <div className="relative flex items-center justify-center px-4 py-12 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={formGridStyle}
        />
        <div className="relative w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
