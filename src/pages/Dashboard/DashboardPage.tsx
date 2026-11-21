import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { isValid, parseISO } from 'date-fns'
import { ArrowRight, Plus } from 'lucide-react'
import { CreateDebtDialog } from '@/features/debts/CreateDebtDialog'
import { useGetDashboardSummaryQuery } from '@/features/dashboard/dashboardApi'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const { data: summary, isLoading, isFetching, isError, refetch } = useGetDashboardSummaryQuery()
  const locale = i18n.language === 'tj' ? 'tg-TJ' : i18n.language
  const statuses = [
    { status: 'pending', count: summary?.counts?.pending, color: 'bg-warning' },
    { status: 'partial', count: summary?.counts?.partial, color: 'bg-primary' },
    { status: 'paid', count: summary?.counts?.paid, color: 'bg-success' },
  ]
  const total = summary?.counts?.total
  const hasChart = total !== undefined && Number.isSafeInteger(total) && total > 0
    && statuses.every(({ count }) => count !== undefined && Number.isSafeInteger(count) && count >= 0)
    && statuses.reduce((sum, { count }) => sum + (count ?? 0), 0) === total
  const pendingEnd = hasChart && summary ? (summary.counts.pending / total * 100) : 0
  const partialEnd = hasChart && summary ? ((summary.counts.pending + summary.counts.partial) / total * 100) : 0

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
    <div className="min-w-0 space-y-6 pb-24" aria-busy={isFetching}>
      <PageHeader
        title={t('pages.dashboard.title')}
        description={t('pages.dashboard.subtitle')}
      />

      {isLoading ? (
        <div role="status" aria-label={t('pages.dashboard.loading')} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((index) => <Skeleton key={index} className="h-36 w-full" />)}
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <Skeleton className="h-80 w-full" /><Skeleton className="h-80 w-full" />
          </div>
        </div>
      ) : isError ? (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center gap-4 py-12" role="alert">
            <p className="text-sm text-destructive">{t('pages.dashboard.loadError')}</p>
            <Button type="button" variant="outline" disabled={isFetching} onClick={() => void refetch()}>
              {t('pages.dashboard.retry')}
            </Button>
          </CardContent>
        </Card>
      ) : !summary ? (
        <EmptyState title={t('pages.dashboard.unavailable')} description={t('pages.dashboard.unavailableHint')} />
      ) : (
        <>
          <section aria-labelledby="dashboard-stats" className="space-y-3">
            <h2 id="dashboard-stats" className="text-sm font-semibold">{t('pages.dashboard.stats')}</h2>
            <p className="max-w-3xl text-sm text-muted-foreground">{t('pages.dashboard.currencyNotice')}</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {['owedToMe', 'iOwe', 'netBalance'].map((key) => (
                <Card key={key} className="min-w-0 border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">{t(`pages.dashboard.${key}`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-semibold tracking-tight">{t('pages.dashboard.amountUnavailable')}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {total === 0 && <EmptyState title={t('pages.dashboard.emptyTitle')} description={t('pages.dashboard.emptyHint')} />}

          <section className="grid min-w-0 items-start gap-4 xl:grid-cols-2">
            <Card className="min-w-0 border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>{t('pages.dashboard.distribution')}</CardTitle>
                <CardDescription>{t('pages.dashboard.distributionHint')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {hasChart && <figure className="flex justify-center" aria-label={t('pages.dashboard.chartSummary', { pending: summary.counts.pending, partial: summary.counts.partial, paid: summary.counts.paid })}>
                  <div className="grid size-44 place-items-center rounded-full p-5" style={{ background: `conic-gradient(var(--warning) 0% ${pendingEnd}%, var(--primary) ${pendingEnd}% ${partialEnd}%, var(--success) ${partialEnd}% 100%)` }}>
                    <div className="flex size-full flex-col items-center justify-center rounded-full bg-card text-center">
                      <span className="text-3xl font-semibold tabular-nums">{formatCount(total)}</span>
                      <span className="text-xs text-muted-foreground">{t('pages.dashboard.totalDebts')}</span>
                    </div>
                  </div>
                </figure>}
                <dl className="grid grid-cols-2 gap-4 border-b border-border pb-6">
                  <div>
                    <dt className="text-sm text-muted-foreground">{t('pages.dashboard.totalDebts')}</dt>
                    <dd className="mt-2 break-words text-3xl font-semibold tabular-nums">{formatCount(total)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">{t('pages.dashboard.contactsCount')}</dt>
                    <dd className="mt-2 break-words text-3xl font-semibold tabular-nums">{formatCount(summary.contacts_count)}</dd>
                  </div>
                </dl>
                <dl className="space-y-5">
                  {statuses.map(({ status, count, color }) => (
                    <div key={status} className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <dt className="flex items-center gap-2">
                          <span className={`size-2 shrink-0 rounded-full ${color}`} aria-hidden="true" />
                          {t(`pages.dashboard.statuses.${status}`)}
                        </dt>
                        <dd className="font-semibold tabular-nums">{formatCount(count)}</dd>
                      </div>
                      {Number.isSafeInteger(total) && total !== undefined && total > 0 && Number.isSafeInteger(count) && count !== undefined && count >= 0 && count <= total && (
                        <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                          <div className={`h-full rounded-full ${color}`} style={{ width: `${count / total * 100}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </dl>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/debts">{t('pages.dashboard.manageDebts')}<ArrowRight /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>{t('pages.dashboard.upcoming')}</CardTitle>
                <CardDescription>{t('pages.dashboard.upcomingHint')}</CardDescription>
              </CardHeader>
              <CardContent>
                {!Array.isArray(summary.upcoming_due) ? (
                  <EmptyState title={t('pages.dashboard.unavailable')} description={t('pages.dashboard.unavailableHint')} />
                ) : summary.upcoming_due.length === 0 ? (
                  <EmptyState title={t('pages.dashboard.noUpcoming')} description={t('pages.dashboard.noUpcomingHint')} />
                ) : (
                  <ul className="max-h-[32rem] space-y-3 overflow-y-auto">
                    {summary.upcoming_due.map((debt) => (
                      <li key={debt.id} className="space-y-3 rounded-xl border border-border/70 bg-background/40 p-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="min-w-0 flex-1 break-words font-medium">{debt.contact_name || t('pages.dashboard.unknownContact')}</p>
                          <Badge variant="outline">
                            {t(`pages.dashboard.statuses.${debt.status}`, { defaultValue: t('pages.dashboard.unavailable') })}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t(`pages.dashboard.directions.${debt.direction}`, { defaultValue: t('pages.dashboard.unavailable') })}
                        </p>
                        <dl className="flex flex-wrap justify-between gap-3 text-sm">
                          <div>
                            <dt className="text-xs text-muted-foreground">{t('pages.dashboard.originalAmount')}</dt>
                            <dd className="break-words font-semibold tabular-nums">{formatAmount(debt.amount)} {debt.currency || t('pages.dashboard.currencyUnavailable')}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-muted-foreground">{t('pages.dashboard.dueDate')}</dt>
                            <dd>{formatDate(debt.due_date)}</dd>
                          </div>
                        </dl>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>
        </>
      )}

      <Button type="button" size="icon-lg" aria-label={t('pages.debts.addTitle')} onClick={() => setOpen(true)} className="fixed right-4 bottom-4 z-40 size-12 rounded-full shadow-xl sm:right-6 sm:bottom-6">
        <Plus className="size-5" />
      </Button>
      <CreateDebtDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
