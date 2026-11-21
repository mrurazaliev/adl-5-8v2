import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye } from 'lucide-react'
import { useGetContactsQuery } from '@/features/contacts/contactsApi'
import { useGetDebtsQuery, useGetDebtByIdQuery } from '@/features/debts/debtsApi'
import { DebtPayments } from '@/features/payments/DebtPayments'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function ArchivePage() {
  const { t, i18n } = useTranslation()
  const [viewingId, setViewingId] = useState<string | null>(null)
  const { data: debts = [], isLoading, isFetching, isError, refetch } = useGetDebtsQuery({})
  const { data: contacts = [], isError: contactsError, refetch: refetchContacts } = useGetContactsQuery()
  const { currentData: viewedDebt, isFetching: detailsLoading, isError: detailsError, refetch: refetchDetails } = useGetDebtByIdQuery(viewingId ?? '', { skip: viewingId === null })
  const archivedDebts = debts.filter((debt) => debt.status === 'paid')
  const locale = i18n.language === 'tj' ? 'tg-TJ' : i18n.language

  function contactName(id: string) {
    return contacts.find((contact) => contact.id === id)?.name ?? t('pages.archive.unknownContact', { id })
  }

  function formatDate(value: string) {
    const date = new Date(value)
    return Number.isFinite(date.getTime()) ? date.toLocaleDateString(locale) : t('pages.archive.unavailable')
  }

  return (
    <div className="min-w-0 space-y-6">
      <PageHeader title={t('pages.archive.title')} description={t('pages.archive.subtitle')} />
      <Card className="min-w-0 border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>{t('pages.archive.title')}</CardTitle>
          <CardDescription>{t('pages.archive.description')}</CardDescription>
          <p className="text-xs leading-relaxed text-muted-foreground">{t('pages.archive.statusHint')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactsError && <div role="alert" className="space-y-2 text-sm">
            <p>{t('pages.archive.contactsError')}</p>
            <Button type="button" variant="outline" onClick={() => void refetchContacts()}>{t('pages.archive.retry')}</Button>
          </div>}
          {isLoading && <div role="status" aria-label={t('pages.archive.loading')} className="space-y-3">
            {[0, 1, 2].map((item) => <Skeleton key={item} className="h-14 w-full" />)}
          </div>}
          {isError && <div role="alert" className="space-y-3 py-8 text-center">
            <p>{t('pages.archive.loadError')}</p>
            <Button type="button" variant="outline" disabled={isFetching} onClick={() => void refetch()}>{t('pages.archive.retry')}</Button>
          </div>}
          {!isLoading && !isError && archivedDebts.length === 0 && <EmptyState title={t('pages.archive.emptyTitle')} description={t('pages.archive.emptyHint')} />}
          {!isError && archivedDebts.length > 0 && <div className="overflow-x-auto" aria-busy={isFetching}>
            <Table>
              <TableHeader><TableRow>
                <TableHead>{t('pages.archive.contact')}</TableHead>
                <TableHead>{t('pages.archive.amount')}</TableHead>
                <TableHead>{t('pages.archive.direction')}</TableHead>
                <TableHead>{t('pages.archive.status')}</TableHead>
                <TableHead>{t('pages.archive.createdAt')}</TableHead>
                <TableHead className="text-right">{t('pages.archive.history')}</TableHead>
              </TableRow></TableHeader>
              <TableBody>{archivedDebts.map((debt) => <TableRow key={debt.id}>
                <TableCell className="font-medium">{contactName(debt.contact_id)}</TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">{debt.amount} {debt.currency}</TableCell>
                <TableCell>{t(`pages.debts.${debt.direction}`)}</TableCell>
                <TableCell><Badge variant="outline" className="bg-success/10 text-success">{t('pages.debts.paid')}</Badge></TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(debt.created_at)}</TableCell>
                <TableCell className="text-right"><Button type="button" variant="ghost" size="icon-sm" aria-label={`${t('pages.archive.history')} ${debt.id}`} onClick={() => setViewingId(debt.id)}><Eye /></Button></TableCell>
              </TableRow>)}</TableBody>
            </Table>
          </div>}
        </CardContent>
      </Card>

      <Dialog open={viewingId !== null} onOpenChange={(value) => { if (!value) setViewingId(null) }}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader><DialogTitle>{t('pages.archive.detailsTitle')}</DialogTitle><DialogDescription>{t('pages.archive.description')}</DialogDescription></DialogHeader>
          {detailsLoading && !viewedDebt && <Skeleton className="h-40 w-full" />}
          {detailsError && <div role="alert" className="space-y-3">
            <p>{t('pages.archive.detailsError')}</p>
            <Button type="button" variant="outline" disabled={detailsLoading} onClick={() => void refetchDetails()}>{t('pages.archive.retry')}</Button>
          </div>}
          {!detailsError && viewedDebt && (viewedDebt.status === 'paid' ? <>
            <dl className="grid grid-cols-[auto_1fr] gap-3 text-sm">
              <dt className="text-muted-foreground">{t('pages.archive.contact')}</dt><dd className="min-w-0 break-words">{contactName(viewedDebt.contact_id)}</dd>
              <dt className="text-muted-foreground">{t('pages.archive.amount')}</dt><dd>{viewedDebt.amount} {viewedDebt.currency}</dd>
              <dt className="text-muted-foreground">{t('pages.archive.direction')}</dt><dd>{t(`pages.debts.${viewedDebt.direction}`)}</dd>
              <dt className="text-muted-foreground">{t('pages.archive.status')}</dt><dd>{t('pages.debts.paid')}</dd>
              <dt className="text-muted-foreground">{t('pages.archive.createdAt')}</dt><dd>{formatDate(viewedDebt.created_at)}</dd>
            </dl>
            <DebtPayments key={viewedDebt.id} debt={viewedDebt} readOnly initialOpen />
          </> : <p role="status" className="text-sm text-muted-foreground">{t('pages.archive.noLongerPaid')}</p>)}
          <DialogFooter><Button type="button" variant="outline" onClick={() => setViewingId(null)}>{t('pages.archive.close')}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
