import { useTranslation } from 'react-i18next'

interface DashboardGreetingProps {
  name?: string
}

export function DashboardGreeting({ name }: DashboardGreetingProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <h1 className="text-[28px] leading-tight font-extrabold tracking-tight break-words sm:text-[30px]">
        {name?.trim() ? <>{t('pages.dashboard.layout.greeting')} <span className="dashboard-name">{name}</span>.</> : t('pages.dashboard.layout.neutralGreeting')}
      </h1>
      <p className="text-xs leading-relaxed text-muted-foreground">{t('pages.dashboard.layout.overview')}</p>
    </div>
  )
}
