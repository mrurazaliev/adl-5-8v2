import { useTranslation } from 'react-i18next'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DebtActionFab } from '@/components/shared/DebtActionFab'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  dashboardStats,
  paymentTrend,
  recentTransactions,
} from '@/mocks/mockData'

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title={t('pages.dashboard.title')}
        description={t('pages.dashboard.subtitle')}
      />

      <section aria-labelledby="dashboard-stats" className="space-y-3">
        <h2 id="dashboard-stats" className="text-sm font-semibold">
          {t('pages.dashboard.stats')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardStats.map((item) => (
            <StatCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.trend')}</CardTitle>
            <CardDescription>Демонстрационные значения по месяцам</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={paymentTrend}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="planned"
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.recent')}</CardTitle>
            <CardDescription>Только визуальные демонстрационные строки</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{row.counterparty}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {row.date} · {row.category}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">{row.amount}</p>
                  <StatusBadge status={row.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <DebtActionFab />
    </div>
  )
}
