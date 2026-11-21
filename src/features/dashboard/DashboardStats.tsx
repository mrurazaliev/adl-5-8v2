import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowDownLeft, ArrowUpRight, Info, Wallet } from 'lucide-react'
import { formatBalanceCents } from '@/features/dashboard/dashboardBalances'
import { DASHBOARD_BALANCE_DEBT_LIMIT, useGetDashboardBalancesQuery } from '@/features/dashboard/dashboardBalancesApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function DashboardStats() {
  const { t, i18n } = useTranslation()
  const [currency, setCurrency] = useState('TJS')
  const { currentData, data, isFetching, isError, error, refetch } = useGetDashboardBalancesQuery(currency, { refetchOnMountOrArgChange: true })
  const balance = !isFetching && !isError ? currentData : undefined
  const locale = i18n.language === 'tj' ? 'tg-TJ' : i18n.language
  const failure = error && 'error' in error ? error.error : undefined
  const currencies = failure === 'BALANCE_LIMIT' && error && 'data' in error
    ? (error.data as { currencies: string[] }).currencies : data?.currencies ?? [currency]
  const cards = [
    { key: 'netBalance', tone: 'net', icon: Wallet, hint: 'netHint', cents: balance?.netBalanceCents, className: 'border-[color:var(--dashboard-net-border)] text-[color:var(--dashboard-net-text)]' },
    { key: 'owedToMe', tone: 'in', icon: ArrowDownLeft, hint: 'receivable', cents: balance?.theyOweMeCents, className: 'border-success/55' },
    { key: 'iOwe', tone: 'out', icon: ArrowUpRight, hint: 'payable', cents: balance?.iOweThemCents, className: 'border-danger/55' },
  ]

  return (
    <section aria-label={t('pages.dashboard.stats')} className="space-y-3" aria-busy={isFetching}>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <label htmlFor="dashboard-balance-currency" className="text-xs text-muted-foreground">{t('pages.dashboard.balances.currency')}</label>
        <Select value={currency} onValueChange={setCurrency} disabled={isFetching}>
          <SelectTrigger id="dashboard-balance-currency" size="sm" className="w-24 rounded-full text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>{currencies.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
        {cards.map(({ key, tone, icon: Icon, hint, cents, className }) => <Card key={key} className={`dashboard-kpi dashboard-kpi-${tone} ${className}`}>
          <CardContent className="relative space-y-2.5">
            <h2 className="flex items-center gap-2 text-[13px] font-semibold"><Icon className="size-4 shrink-0" />{t(`pages.dashboard.${key}`)}</h2>
            {cents !== undefined ? <p className="break-words text-[28px] leading-tight font-extrabold tracking-tight tabular-nums">{formatBalanceCents(cents, locale, currency, key === 'netBalance')}</p>
              : isError ? <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-label={t('pages.dashboard.amountUnavailable')}>
                <span className="text-[32px] leading-none font-extrabold tracking-tight" aria-hidden="true">—</span>
                <span className="text-xs font-medium">{t('pages.dashboard.layout.notAvailable')}</span>
              </p> : <div role="status" aria-label={t('pages.dashboard.balances.loading')}><Skeleton className="h-9 w-32 max-w-full bg-current/10" /></div>}
            <p className="text-xs">{t(`pages.dashboard.layout.${hint}`)}</p>
          </CardContent>
        </Card>)}
      </div>
      {isError && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-card p-3 text-sm">
        <p className="max-w-3xl text-destructive">{t(failure === 'BALANCE_LIMIT' ? 'pages.dashboard.balances.limit' : failure === 'BALANCE_INVALID_DATA' ? 'pages.dashboard.balances.invalid' : 'pages.dashboard.balances.error', { limit: DASHBOARD_BALANCE_DEBT_LIMIT })}</p>
        <Button type="button" variant="outline" size="sm" onClick={() => void refetch()}>{t('pages.dashboard.balances.retry')}</Button>
      </div>}
      {balance?.debtCount === 0 && <p role="status" className="text-xs text-muted-foreground">{t('pages.dashboard.balances.empty')}</p>}
      <details className="dashboard-data-note text-xs text-muted-foreground">
        <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-md py-1 focus-visible:outline-2 focus-visible:outline-ring"><Info className="size-3.5" />{t('pages.dashboard.balances.info')}</summary>
        <p className="mt-2 max-w-3xl rounded-xl border border-border bg-card p-3 leading-relaxed">{t('pages.dashboard.balances.explanation')}</p>
      </details>
    </section>
  )
}
