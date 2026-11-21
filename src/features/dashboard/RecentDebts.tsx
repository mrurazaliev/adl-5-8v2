import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useGetDebtsQuery } from '@/features/debts/debtsApi'
import { useGetContactsQuery } from '@/features/contacts/contactsApi'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function RecentDebts() {
  const { t, i18n } = useTranslation()
  const { data: debts = [], isLoading, isError, refetch } = useGetDebtsQuery({})
  const { data: contacts = [] } = useGetContactsQuery()
  const recent = [...debts].sort((a,b) => Date.parse(b.created_at)-Date.parse(a.created_at)).slice(0,5)
  const locale = i18n.language === 'tj' ? 'tg-TJ' : i18n.language
  return <Card className="dashboard-recent min-w-0 shadow-card">
    <CardHeader className="flex flex-row items-center justify-between gap-3">
      <CardTitle>{t('pages.dashboard.recentDebts')}</CardTitle>
      <Link to="/debts" className="flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-hover hover:text-foreground">{t('common.all')}<ArrowRight className="size-3" /></Link>
    </CardHeader>
    <CardContent>
      <p className="mb-2 text-xs text-muted-foreground">{t('pages.dashboard.layout.recentHint')}</p>
      {isLoading ? <Skeleton className="h-64 w-full" /> : isError ? <div role="alert"><p>{t('pages.debts.loadError')}</p><Button variant="outline" onClick={() => void refetch()}>{t('pages.debts.retry')}</Button></div> : recent.length === 0 ? <p className="py-8 text-sm text-muted-foreground">{t('pages.dashboard.emptyTitle')}</p> : <ul className="divide-y divide-border/70">{recent.map(debt => <li key={debt.id} className="flex min-w-0 items-start gap-3 py-3.5">
        <span className={`grid size-9 shrink-0 place-items-center rounded-full border ${debt.direction === 'they_owe_me' ? 'border-success/20 bg-success/10 text-success' : 'border-danger/20 bg-danger/10 text-danger'}`} aria-label={t(`pages.debts.${debt.direction}`)}>
          {debt.direction === 'they_owe_me' ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-bold">{contacts.find(contact => contact.id === debt.contact_id)?.name ?? t('pages.debts.unknownContact', { id: debt.contact_id })}</p>
          <p className="text-xs text-muted-foreground">{t(`pages.debts.${debt.status}`)}</p>
          <p className="text-[11px] text-muted-foreground">{Number.isFinite(Date.parse(debt.created_at)) ? new Date(debt.created_at).toLocaleString(locale) : t('pages.dashboard.unavailable')}</p>
        </div>
        <div className="max-w-[45%] space-y-1 text-right">
          <p className={`break-words text-sm font-extrabold tabular-nums ${debt.direction === 'they_owe_me' ? 'text-success' : 'text-danger'}`}>{debt.amount} {debt.currency}</p>
          <p className="text-[10px] text-muted-foreground">{t('pages.dashboard.layout.originalAmount')}</p>
        </div>
      </li>)}</ul>}
    </CardContent>
  </Card>
}
