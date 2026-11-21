import { useTranslation } from 'react-i18next'
import { useGetDebtsQuery } from '@/features/debts/debtsApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface ContactDebtsProps {
  contactId: string
}

export function ContactDebts({ contactId }: ContactDebtsProps) {
  const { t } = useTranslation()
  const { currentData: debts = [], isFetching, isError, refetch } = useGetDebtsQuery({ contact_id: contactId })
  const currencies = [...new Set(debts.map((debt) => debt.currency))].sort()

  return (
    <div className="min-w-0 space-y-4" aria-busy={isFetching}>
      <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">{t('pages.debts.financialHint')}</p>
      {isFetching && debts.length === 0 && <Skeleton className="h-32 w-full" />}
      {isError && <div role="alert" className="space-y-3">
        <p>{t('pages.debts.loadError')}</p>
        <Button variant="outline" disabled={isFetching} onClick={() => void refetch()}>{t('pages.debts.retry')}</Button>
      </div>}
      {!isFetching && !isError && debts.length === 0 && <p className="py-6 text-center text-muted-foreground">{t('pages.debts.empty')}</p>}
      {!isError && currencies.map((currency) => <section key={currency} className="space-y-2">
        <h3 className="font-semibold">{currency}</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>{t('pages.debts.direction')}</TableHead>
              <TableHead>{t('pages.debts.originalAmount')}</TableHead>
              <TableHead>{t('common.status')}</TableHead>
            </TableRow></TableHeader>
            <TableBody>{debts.filter((debt) => debt.currency === currency).map((debt) => <TableRow key={debt.id}>
              <TableCell className={debt.direction === 'they_owe_me' ? 'text-success' : 'text-destructive'}>{t(`pages.debts.${debt.direction}`)}</TableCell>
              <TableCell className="whitespace-nowrap tabular-nums">{debt.amount} {debt.currency}</TableCell>
              <TableCell><Badge variant="outline">{t(`pages.debts.${debt.status}`)}</Badge></TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </div>
      </section>)}
    </div>
  )
}
