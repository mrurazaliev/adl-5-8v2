import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from 'recharts'
import { useGetDebtsQuery } from '@/features/debts/debtsApi'
import { formatDebtCents, groupMonthlyDebts, prepareMonthlyDebts } from '@/features/dashboard/monthlyDebtData'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface MonthlyTooltipProps extends TooltipContentProps<number, string> {
  year: number
  currency: string
  locale: string
}

export function MonthlyDebtTooltip({ active, label, payload, year, currency, locale }: MonthlyTooltipProps) {
  if (!active || !payload.length) return null
  const month = Number(label)
  if (!Number.isInteger(month) || month < 0 || month > 11) return null
  return (
    <div className="max-w-[min(20rem,80vw)] space-y-3 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <p className="font-semibold">{new Date(2000, month, 1).toLocaleDateString(locale, { month: 'long' })} {year}</p>
      {payload.map((item) => (
        <div key={String(item.dataKey)} className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1">
          <span className="flex items-center gap-2"><span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
          <span className="font-semibold tabular-nums">{typeof item.value === 'number' ? formatDebtCents(item.value, locale, currency) : '—'}</span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyDebtChart() {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const { data: debts, isLoading, isFetching, isError, refetch } = useGetDebtsQuery({})
  const locale = i18n.language === 'tj' ? 'tg-TJ' : i18n.language
  const records = Array.isArray(debts) ? prepareMonthlyDebts(debts) : null
  const currencies = [...new Set(records?.map((record) => record.currency) ?? [])].sort()
  const currency = currencies.includes(selectedCurrency) ? selectedCurrency : currencies[0] ?? ''
  const range = (records ?? []).reduce((result, record) => ({
    first: Math.min(result.first, record.year), last: Math.max(result.last, record.year),
  }), { first: Math.min(currentYear, year), last: Math.max(currentYear, year) })
  const years = Array.from({ length: range.last - range.first + 1 }, (_, index) => range.last - index)
  const points = records ? groupMonthlyDebts(records, year, currency) : null
  const hasRecords = records?.some((record) => record.year === year && record.currency === currency)
  const directions = [
    { key: 'they_owe_me', color: 'var(--success)' },
    { key: 'i_owe_them', color: 'var(--danger)' },
  ] as const

  function monthName(month: number, format: 'short' | 'long') {
    return new Date(2000, month, 1).toLocaleDateString(locale, { month: format })
  }

  function formatAxis(cents: number) {
    return (cents / 100).toLocaleString(locale, { notation: 'compact', maximumFractionDigits: 2 })
  }

  return (
    <Card className="min-w-0 border-border/70 shadow-sm" aria-busy={isFetching}>
      <CardHeader className="gap-4 sm:flex sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <CardTitle>{t('pages.dashboard.monthly.title')}</CardTitle>
          <CardDescription>{t('pages.dashboard.monthly.description')}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="space-y-1">
            <label htmlFor="monthly-debt-year" className="text-xs text-muted-foreground">{t('pages.dashboard.monthly.year')}</label>
            <Select value={String(year)} onValueChange={(value) => setYear(Number(value))} disabled={isLoading}>
              <SelectTrigger id="monthly-debt-year" className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>{years.map((option) => <SelectItem key={option} value={String(option)}>{option}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label htmlFor="monthly-debt-currency" className="text-xs text-muted-foreground">{t('pages.dashboard.monthly.currency')}</label>
            <Select value={currency} onValueChange={setSelectedCurrency} disabled={isLoading || currencies.length < 2}>
              <SelectTrigger id="monthly-debt-currency" className="w-28"><SelectValue placeholder={t('pages.dashboard.monthly.noCurrency')} /></SelectTrigger>
              <SelectContent>{currencies.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-w-0 space-y-4">
        {isLoading ? (
          <div role="status" aria-label={t('pages.dashboard.monthly.loading')}><Skeleton className="h-80 w-full" /></div>
        ) : isError ? (
          <div role="alert" className="space-y-3 py-10 text-center">
            <p className="text-sm text-destructive">{t('pages.dashboard.monthly.loadError')}</p>
            <Button type="button" variant="outline" disabled={isFetching} onClick={() => void refetch()}>{t('pages.dashboard.monthly.retry')}</Button>
          </div>
        ) : !records || !points ? (
          <EmptyState title={t('pages.dashboard.monthly.invalidTitle')} description={t('pages.dashboard.monthly.invalidHint')} />
        ) : records.length === 0 ? (
          <EmptyState title={t('pages.dashboard.monthly.emptyTitle')} description={t('pages.dashboard.monthly.emptyHint')} />
        ) : !hasRecords ? (
          <EmptyState title={t('pages.dashboard.monthly.emptyYearTitle')} description={t('pages.dashboard.monthly.emptyYearHint', { year, currency })} />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <p>{t('pages.dashboard.monthly.amount', { currency })}</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {directions.map(({ key, color }) => <li key={key} className="flex items-center gap-2">
                  <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: color }} />{t(`pages.dashboard.monthly.${key}`)}
                </li>)}
              </ul>
            </div>
            <div className="h-72 min-w-0 sm:h-80" role="group" aria-label={t('pages.dashboard.monthly.chartLabel', { year, currency })}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={points} margin={{ top: 16, right: 12, bottom: 4, left: 0 }} accessibilityLayer>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
                  <XAxis dataKey="month" tickFormatter={(month: number) => monthName(month, 'short')} tickLine={false} axisLine={false} minTickGap={14} interval="preserveStartEnd" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={8} height={36} />
                  <YAxis tickFormatter={formatAxis} domain={[0, 'auto']} allowDecimals={false} tickLine={false} axisLine={false} width={64} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip content={(props) => <MonthlyDebtTooltip {...props} year={year} currency={currency} locale={locale} />} cursor={{ stroke: 'var(--border)', strokeDasharray: '4 4' }} isAnimationActive={false} />
                  {directions.map(({ key, color }) => <Line key={key} type="monotone" dataKey={key} name={t(`pages.dashboard.monthly.${key}`)} stroke={color} strokeWidth={2.5} dot={{ r: 3, fill: 'var(--card)', strokeWidth: 2 }} activeDot={{ r: 6, fill: color, stroke: 'var(--background)', strokeWidth: 3 }} isAnimationActive={false} />)}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground">{t('pages.dashboard.monthly.zeroHint')}</p>
            <details className="rounded-lg border border-border px-3 py-2 text-sm">
              <summary className="cursor-pointer font-medium">{t('pages.dashboard.monthly.table')}</summary>
              <div className="mt-3 overflow-x-auto">
                <Table>
                  <TableHeader><TableRow><TableHead>{t('pages.dashboard.monthly.month')}</TableHead>{directions.map(({ key }) => <TableHead key={key} className="text-right">{t(`pages.dashboard.monthly.${key}`)}</TableHead>)}</TableRow></TableHeader>
                  <TableBody>{points.map((point) => <TableRow key={point.month}>
                    <TableCell>{monthName(point.month, 'long')}</TableCell>
                    {directions.map(({ key }) => <TableCell key={key} className="text-right whitespace-nowrap tabular-nums">{formatDebtCents(point[key], locale, currency)}</TableCell>)}
                  </TableRow>)}</TableBody>
                </Table>
              </div>
            </details>
          </>
        )}
        <p className="text-xs leading-relaxed text-muted-foreground">{t('pages.dashboard.monthly.sourceHint', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}</p>
      </CardContent>
    </Card>
  )
}
