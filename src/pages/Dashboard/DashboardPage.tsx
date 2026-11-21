import { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { isValid, parseISO } from 'date-fns'
import { ArrowRight, Plus } from 'lucide-react'
import { useAppSelector } from '@/app/hooks'
import { CreateDebtDialog } from '@/features/debts/CreateDebtDialog'
import { DashboardGreeting } from '@/features/dashboard/DashboardGreeting'
import { DashboardStats } from '@/features/dashboard/DashboardStats'
import { DashboardDueDates } from '@/features/dashboard/DashboardDueDates'
import RecentDebts from '@/features/dashboard/RecentDebts'
import { useGetDashboardSummaryQuery } from '@/features/dashboard/dashboardApi'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const MonthlyDebtChart = lazy(() => import('@/features/dashboard/MonthlyDebtChart'))

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const { data: summary, isLoading, isFetching, isError, refetch } = useGetDashboardSummaryQuery()
  const locale = i18n.language === 'tj' ? 'tg-TJ' : i18n.language
  const statuses = [
    { status: 'pending', count: summary?.counts?.pending, color: 'bg-muted-foreground' },
    { status: 'partial', count: summary?.counts?.partial, color: 'bg-primary' },
    { status: 'paid', count: summary?.counts?.paid, color: 'bg-success' },
  ]
  const total = summary?.counts?.total

  function formatCount(value: number | undefined) {
    return Number.isSafeInteger(value) && value !== undefined && value >= 0
      ? value.toLocaleString(locale)
      : t('pages.dashboard.unavailable')
  }

  function formatAmount(value: number) {
    return typeof value === 'number' && Number.isFinite(value)
      ? value.toLocaleString(locale, { maximumFractionDigits: 2 })
      : t('pages.dashboard.unavailable')
  }

  function formatDate(value: string | null) {
    if (!value) return t('pages.dashboard.unavailable')
    const date = parseISO(value.slice(0, 10))
    return isValid(date) ? date.toLocaleDateString(locale) : t('pages.dashboard.unavailable')
  }

  return (
    <div className="dashboard-layout min-w-0 space-y-4 pb-20" aria-busy={isFetching}>
      <div className="mb-6 mt-1"><DashboardGreeting name={user?.name} /></div>

      {isLoading ? (
        <div role="status" aria-label={t('pages.dashboard.loading')} className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
          {[0, 1, 2].map((index) => <Skeleton key={index} className="h-36 w-full rounded-2xl" />)}
        </div>
      ) : isError ? (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-wrap items-center justify-between gap-4" role="alert">
            <p className="text-sm text-destructive">{t('pages.dashboard.loadError')}</p>
            <Button type="button" variant="outline" disabled={isFetching} onClick={() => void refetch()}>{t('pages.dashboard.retry')}</Button>
          </CardContent>
        </Card>
      ) : !summary ? (
        <EmptyState title={t('pages.dashboard.unavailable')} description={t('pages.dashboard.unavailableHint')} />
      ) : (
        <DashboardStats />
      )}

      <section className="dashboard-main-grid grid min-w-0 items-stretch gap-4 xl:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
        <Suspense fallback={<div role="status" aria-label={t('pages.dashboard.monthly.loading')}><Skeleton className="h-[30rem] w-full rounded-2xl" /></div>}>
          <MonthlyDebtChart />
        </Suspense>
        <RecentDebts />
      </section>

      {!isLoading && !isError && summary && <>
        <section aria-label={t('pages.dashboard.layout.counts')} className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-border/70 bg-card/60 px-5 py-4">
          <dl className="flex flex-1 flex-wrap gap-x-6 gap-y-3 text-xs">
            <div className="flex items-center gap-2"><dt className="text-muted-foreground">{t('pages.dashboard.totalDebts')}</dt><dd className="font-bold tabular-nums">{formatCount(total)}</dd></div>
            <div className="flex items-center gap-2"><dt className="text-muted-foreground">{t('pages.dashboard.contactsCount')}</dt><dd className="font-bold tabular-nums">{formatCount(summary.contacts_count)}</dd></div>
            {statuses.map(({ status, count, color }) => <div key={status} className="flex items-center gap-2">
              <dt className="flex items-center gap-1.5 text-muted-foreground"><span className={`size-1.5 rounded-full ${color}`} aria-hidden="true" />{t(`pages.dashboard.statuses.${status}`)}</dt>
              <dd className="font-bold tabular-nums">{formatCount(count)}</dd>
            </div>)}
          </dl>
          <Link to="/debts" className="flex items-center gap-1 text-xs font-semibold text-primary-light hover:underline">{t('pages.dashboard.manageDebts')}<ArrowRight className="size-3.5" /></Link>
        </section>
        {total === 0 && <EmptyState title={t('pages.dashboard.emptyTitle')} description={t('pages.dashboard.emptyHint')} />}
        <DashboardDueDates debts={summary.upcoming_due} formatAmount={formatAmount} formatDate={formatDate} />
      </>}

      <Button type="button" size="icon-lg" aria-label={t('pages.debts.addTitle')} onClick={() => setOpen(true)} className="dashboard-fab fixed right-4 bottom-4 z-40 size-14 rounded-[18px] shadow-primary sm:right-7 sm:bottom-7">
        <Plus className="size-7" />
      </Button>
      <CreateDebtDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}