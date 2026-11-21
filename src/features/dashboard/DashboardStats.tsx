import { useTranslation } from 'react-i18next'
import { ArrowDownLeft, ArrowUpRight, Info, Wallet } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function DashboardStats() {
  const { t } = useTranslation()
  const cards = [
    { key: 'netBalance', tone: 'net', icon: Wallet, hint: 'netHint', className: 'border-[color:var(--dashboard-net-border)] text-[color:var(--dashboard-net-text)]' },
    { key: 'owedToMe', tone: 'in', icon: ArrowDownLeft, hint: 'receivable', className: 'border-success/55' },
    { key: 'iOwe', tone: 'out', icon: ArrowUpRight, hint: 'payable', className: 'border-danger/55' },
  ]

  return (
    <section aria-label={t('pages.dashboard.stats')} className="space-y-3">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
        {cards.map(({ key, tone, icon: Icon, hint, className }) => <Card key={key} className={`dashboard-kpi dashboard-kpi-${tone} ${className}`}>
          <CardContent className="relative space-y-2.5">
            <h2 className="flex items-center gap-2 text-[13px] font-semibold"><Icon className="size-4 shrink-0" />{t(`pages.dashboard.${key}`)}</h2>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-label={t('pages.dashboard.amountUnavailable')}>
              <span className="text-[32px] leading-none font-extrabold tracking-tight" aria-hidden="true">—</span>
              <span className="text-xs font-medium">{t('pages.dashboard.layout.notAvailable')}</span>
            </p>
            <p className="text-xs">{t(`pages.dashboard.layout.${hint}`)}</p>
          </CardContent>
        </Card>)}
      </div>
      <details className="dashboard-data-note text-xs text-muted-foreground">
        <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-md py-1 focus-visible:outline-2 focus-visible:outline-ring"><Info className="size-3.5" />{t('pages.dashboard.layout.balanceInfo')}</summary>
        <p className="mt-2 max-w-3xl rounded-xl border border-border bg-card p-3 leading-relaxed">{t('pages.dashboard.balanceLimitation')}</p>
      </details>
    </section>
  )
}
