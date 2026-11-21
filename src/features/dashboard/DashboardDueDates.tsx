import { useTranslation } from 'react-i18next'
import { CalendarDays } from 'lucide-react'
import type { UpcomingDebt } from '@/features/dashboard/dashboardApi'
import { EmptyState } from '@/components/shared/EmptyState'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardDueDatesProps {
  debts: UpcomingDebt[] | undefined
  formatAmount: (amount: number) => string
  formatDate: (date: string | null) => string
}

export function DashboardDueDates({ debts, formatAmount, formatDate }: DashboardDueDatesProps) {
  const { t } = useTranslation()

  return (
    <Card className="shadow-card">
      <CardHeader className="gap-2">
        <CardTitle className="flex items-center gap-2"><CalendarDays className="size-4 text-primary-light" />{t('pages.dashboard.upcoming')}</CardTitle>
        <CardDescription>{t('pages.dashboard.upcomingHint')}</CardDescription>
      </CardHeader>
      <CardContent>
        {!Array.isArray(debts) ? <EmptyState title={t('pages.dashboard.unavailable')} description={t('pages.dashboard.unavailableHint')} />
          : debts.length === 0 ? <EmptyState title={t('pages.dashboard.noUpcoming')} description={t('pages.dashboard.noUpcomingHint')} />
          : <ul className="grid max-h-[32rem] gap-3 overflow-y-auto sm:grid-cols-2 xl:grid-cols-3">
            {debts.map((debt) => <li key={debt.id} className="space-y-3 rounded-xl border border-border bg-control/50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="min-w-0 flex-1 break-words text-sm font-bold">{debt.contact_name || t('pages.dashboard.unknownContact')}</p>
                <Badge variant="outline">{t(`pages.dashboard.statuses.${debt.status}`, { defaultValue: t('pages.dashboard.unavailable') })}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{t(`pages.dashboard.directions.${debt.direction}`, { defaultValue: t('pages.dashboard.unavailable') })}</p>
              <dl className="flex flex-wrap justify-between gap-3 text-sm">
                <div><dt className="text-xs text-muted-foreground">{t('pages.dashboard.layout.originalAmount')}</dt><dd className="mt-1 break-words font-bold tabular-nums">{formatAmount(debt.amount)} {debt.currency || t('pages.dashboard.currencyUnavailable')}</dd></div>
                <div><dt className="text-xs text-muted-foreground">{t('pages.dashboard.dueDate')}</dt><dd className="mt-1">{formatDate(debt.due_date)}</dd></div>
              </dl>
            </li>)}
          </ul>}
      </CardContent>
    </Card>
  )
}
