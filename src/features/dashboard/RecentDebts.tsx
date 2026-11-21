import { useTranslation } from 'react-i18next'
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
  return <Card className="min-w-0">
    <CardHeader><CardTitle>{t('pages.dashboard.recentDebts')}</CardTitle></CardHeader>
    <CardContent className="space-y-3">
      {isLoading ? <Skeleton className="h-32 w-full" /> : isError ? <div role="alert"><p>{t('pages.debts.loadError')}</p><Button variant="outline" onClick={() => void refetch()}>{t('pages.debts.retry')}</Button></div> : recent.length === 0 ? <p>{t('pages.dashboard.emptyTitle')}</p> : recent.map(debt => <article key={debt.id} className="space-y-2 rounded-xl border border-border p-3 text-sm">
        <p className="break-words font-semibold">{contacts.find(contact => contact.id === debt.contact_id)?.name ?? t('pages.debts.unknownContact', { id: debt.contact_id })}</p>
        <div className="flex flex-wrap justify-between gap-2"><span>{debt.amount} {debt.currency}</span><span>{t(`pages.debts.${debt.direction}`)}</span><span>{t(`pages.debts.${debt.status}`)}</span></div>
        <p className="text-muted-foreground">{Number.isFinite(Date.parse(debt.created_at)) ? new Date(debt.created_at).toLocaleString(locale) : t('pages.dashboard.unavailable')}</p>
      </article>)}
    </CardContent>
  </Card>
}
