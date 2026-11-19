import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowUpRight, FolderPlus, Plus, ReceiptText, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  dashboardStats,
  paymentDistribution,
  paymentTrend,
  recentTransactions,
} from '@/mocks/mockData'

export default function DashboardPage() {
  const { t } = useTranslation()
  const [quickAction, setQuickAction] = useState<string | null>(null)

  const actions = [
    { label: 'Новый долг', icon: Plus },
    { label: 'Новый контакт', icon: UserPlus },
    { label: 'Новая папка', icon: FolderPlus },
    { label: 'Новый платёж', icon: ReceiptText },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.dashboard.title')}
        description={t('pages.dashboard.subtitle')}
      />

      <section aria-labelledby="dashboard-stats" className="space-y-3">
        <h2 id="dashboard-stats" className="text-sm font-semibold">
          {t('pages.dashboard.stats')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          <CardContent className="h-[300px]">
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
            <CardTitle>{t('pages.dashboard.structure')}</CardTitle>
            <CardDescription>Демонстрационное распределение</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {paymentDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.recent')}</CardTitle>
            <CardDescription>Только визуальные демонстрационные строки</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Контрагент</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-xs">{row.id}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {row.counterparty}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{row.category}</TableCell>
                    <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                    <TableCell className="whitespace-nowrap">{row.amount}</TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.quick')}</CardTitle>
            <CardDescription>Действия откроют демонстрационное окно</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {actions.map((action) => (
              <Button
                key={action.label}
                type="button"
                variant="outline"
                className="justify-start"
                onClick={() => setQuickAction(action.label)}
              >
                <action.icon />
                {action.label}
                <ArrowUpRight className="ml-auto" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </section>

      <DemoActionDialog
        open={quickAction !== null}
        onOpenChange={(open) => {
          if (!open) setQuickAction(null)
        }}
        title={quickAction ?? ''}
        description="Это демонстрационное окно. Сохранение данных появится после подключения backend."
      />
    </div>
  )
}
