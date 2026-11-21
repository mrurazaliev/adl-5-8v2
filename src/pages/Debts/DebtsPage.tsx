import { DebtPayments } from '@/features/payments/DebtPayments'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { CreateDebtDialog } from '@/features/debts/CreateDebtDialog'
import { toast } from 'sonner'
import { useGetContactsQuery } from '@/features/contacts/contactsApi'
import {
  useGetDebtsQuery, useGetDebtByIdQuery,
  useUpdateDebtMutation, useDeleteDebtMutation,
  type Debt, type DebtFilters,
} from '@/features/debts/debtsApi'
import { createDebtSchema, type DebtFormValues } from '@/features/debts/debtsSchema'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DebtsPage() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dateRequired, setDateRequired] = useState(false)
  const [deletingDebt, setDeletingDebt] = useState<Debt | null>(null)
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [paymentSaving, setPaymentSaving] = useState(false)
  const [filters, setFilters] = useState<DebtFilters>({})
  const { currentData: allDebts = [], isFetching, isError, refetch } = useGetDebtsQuery(filters)
  const debts = allDebts.filter((debt) => debt.status === 'pending' || debt.status === 'partial')
  const {
    data: contacts = [], isLoading: contactsLoading, isError: contactsError,
    refetch: refetchContacts,
  } = useGetContactsQuery()
  const {
    currentData: viewedDebt, isFetching: detailsLoading, isError: detailsError,
    refetch: refetchDetails,
  } = useGetDebtByIdQuery(viewingId ?? '', { skip: viewingId === null })
  const [updateDebt, { isLoading: isUpdating }] = useUpdateDebtMutation()
  const [deleteDebt, { isLoading: isDeleting }] = useDeleteDebtMutation()
  const schema = createDebtSchema(t, dateRequired)
  const {
    reset, setValue, register, handleSubmit, control,
    formState: { errors, isSubmitting },
  } = useForm<DebtFormValues>({
    resolver: zodResolver(schema.extend({
      contact_id: schema.shape.contact_id.refine(
        (id) => contacts.some((contact) => contact.id === id),
        t('pages.debts.validation.contact'),
      ),
    })),
    defaultValues: {
      contact_id: '', direction: 'they_owe_me', amount: 0,
      currency: 'USD', description: '', due_date: '',
    },
  })
  const isSaving = isSubmitting || isUpdating
  const contactsUnavailable = contactsLoading || contactsError || contacts.length === 0
  const hasFilters = Boolean(filters.direction || filters.status || filters.contact_id)

  function contactName(id: string) {
    return contacts.find((contact) => contact.id === id)?.name
      ?? t('pages.debts.unknownContact', { id })
  }

  function handleOpenAdd() {
    setCreateOpen(true)
  }

  function handleOpenEdit(debt: Debt) {
    setEditingId(debt.id)
    setDateRequired(Boolean(debt.due_date))
    reset()
    setValue('contact_id', debt.contact_id)
    setValue('direction', debt.direction)
    setValue('amount', Number(debt.amount))
    setValue('currency', debt.currency)
    setValue('description', debt.description ?? '')
    setValue('due_date', debt.due_date?.slice(0, 10) ?? '')
    setOpen(true)
  }

  const onSubmit: SubmitHandler<DebtFormValues> = async (data) => {
    if (isUpdating || contactsUnavailable || editingId === null) return
    const payload = { ...data, due_date: data.due_date || undefined }
    try {
      await updateDebt({ id: editingId, ...payload }).unwrap()
      toast.success(t('pages.debts.messages.updated'))
      setOpen(false)
      setEditingId(null)
      reset()
    } catch {
      toast.error(t('pages.debts.messages.saveError'))
    }
  }

  async function handleDelete() {
    if (!deletingDebt || isDeleting) return
    try {
      await deleteDebt(deletingDebt.id).unwrap()
      toast.success(t('pages.debts.messages.deleted'))
      setDeletingDebt(null)
    } catch {
      toast.error(t('pages.debts.messages.deleteError'))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t('pages.debts.title')} description={t('pages.debts.subtitle')}
        actions={<Button onClick={handleOpenAdd}><Plus />{t('common.add')}</Button>} />

      {contactsLoading && <p role="status" className="text-sm text-muted-foreground">{t('pages.debts.contactsLoading')}</p>}
      {contactsError && <div role="alert" className="flex flex-wrap items-center gap-3 text-sm text-destructive">
        {t('pages.debts.creation.contactsError')}
        <Button variant="outline" onClick={() => void refetchContacts()}>{t('pages.debts.retry')}</Button>
      </div>}
      {!contactsLoading && !contactsError && contacts.length === 0 &&
        <p className="text-sm text-muted-foreground">{t('pages.debts.creation.noContacts')}</p>}

      <Card className="border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle>{t('pages.debts.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">{t('pages.debts.financialHint')}</p>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Select value={filters.direction ?? 'all'} onValueChange={(value) => setFilters({ ...filters, direction: value === 'all' ? undefined : value as DebtFilters['direction'] })}>
              <SelectTrigger className="w-full" aria-label={t('pages.debts.direction')}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="they_owe_me">{t('pages.debts.they_owe_me')}</SelectItem>
                <SelectItem value="i_owe_them">{t('pages.debts.i_owe_them')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status ?? 'all'} onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? undefined : value as DebtFilters['status'] })}>
              <SelectTrigger className="w-full" aria-label={t('common.status')}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                {(['pending', 'partial'] as const).map((status) => <SelectItem key={status} value={status}>{t(`pages.debts.${status}`)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filters.contact_id ?? 'all'} disabled={contactsUnavailable} onValueChange={(value) => setFilters({ ...filters, contact_id: value === 'all' ? undefined : value })}>
              <SelectTrigger className="w-full" aria-label={t('pages.debts.contact')}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                {contacts.map((contact) => <SelectItem key={contact.id} value={contact.id}>{contact.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" disabled={!hasFilters} onClick={() => setFilters({})}>{t('pages.debts.resetFilters')}</Button>
          </div>

          {isFetching && debts.length === 0 && <div role="status" aria-label={t('pages.debts.loading')} className="space-y-3">
            {[1, 2, 3].map((id) => <Skeleton key={id} className="h-14 w-full" />)}
          </div>}
          {isError && <div role="alert" className="space-y-3 py-8 text-center">
            <p>{t('pages.debts.loadError')}</p>
            <Button variant="outline" disabled={isFetching} onClick={() => void refetch()}>{t('pages.debts.retry')}</Button>
          </div>}
          {!isFetching && !isError && debts.length === 0 && <p className="py-10 text-center text-muted-foreground">
            {t(hasFilters ? 'pages.debts.noResults' : 'pages.debts.empty')}
          </p>}
          {!isError && debts.length > 0 && <div className="overflow-x-auto" aria-busy={isFetching}>
            <Table>
              <TableHeader><TableRow>
                <TableHead>{t('pages.debts.contact')}</TableHead>
                <TableHead>{t('pages.debts.direction')}</TableHead>
                <TableHead>{t('pages.debts.originalAmount')}</TableHead>
                <TableHead>{t('common.status')}</TableHead>
                <TableHead>{t('pages.debts.due_date')}</TableHead>
                <TableHead>{t('pages.debts.description')}</TableHead>
                <TableHead className="text-right">{t('pages.debts.actions')}</TableHead>
              </TableRow></TableHeader>
              <TableBody>{debts.map((debt) => <TableRow key={debt.id}>
                <TableCell className="font-medium">{contactName(debt.contact_id)}</TableCell>
                <TableCell>{t(`pages.debts.${debt.direction}`)}</TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">{debt.amount} {debt.currency}</TableCell>
                <TableCell><Badge variant="outline" className={debt.status === 'paid' ? 'border-success/30 bg-success/10 text-success' : debt.status === 'partial' ? 'border-primary/30 bg-primary/15 text-primary-light' : 'border-border bg-muted/50 text-muted-foreground'}>{t(`pages.debts.${debt.status}`)}</Badge></TableCell>
                <TableCell className="whitespace-nowrap">{debt.due_date?.slice(0, 10) ?? '—'}</TableCell>
                <TableCell className="max-w-60"><p className="line-clamp-2 break-words">{debt.description || '—'}</p></TableCell>
                <TableCell><div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon-sm" aria-label={`${t('common.view')} ${debt.id}`} onClick={() => setViewingId(debt.id)}><Eye /></Button>
                  <Button variant="ghost" size="icon-sm" aria-label={`${t('common.edit')} ${debt.id}`} disabled={contactsUnavailable} onClick={() => handleOpenEdit(debt)}><Pencil /></Button>
                  <Button variant="ghost" size="icon-sm" className="text-destructive" aria-label={`${t('pages.debts.delete')} ${debt.id}`} disabled={isDeleting} onClick={() => setDeletingDebt(debt)}><Trash2 /></Button>
                </div></TableCell>
              </TableRow>)}</TableBody>
            </Table>
          </div>}
        </CardContent>
      </Card>

      <CreateDebtDialog open={createOpen} onOpenChange={setCreateOpen} />

      <Dialog open={open} onOpenChange={(value) => { if (!isSaving) setOpen(value) }}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t(editingId ? 'pages.debts.editTitle' : 'pages.debts.addTitle')}</DialogTitle>
            <DialogDescription>{t('pages.debts.formDescription')}</DialogDescription>
          </DialogHeader>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSaving}>
              <FieldGroup>
                <Controller name="contact_id" control={control} render={({ field }) => (
                  <Field data-invalid={Boolean(errors.contact_id)}>
                    <FieldLabel htmlFor="debt-contact">{t('pages.debts.contact')}</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange} disabled={isSaving || contactsUnavailable}>
                      <SelectTrigger id="debt-contact" ref={field.ref} onBlur={field.onBlur} className="w-full" aria-invalid={Boolean(errors.contact_id)} aria-describedby="debt-contact-error"><SelectValue placeholder={t('pages.debts.chooseContact')} /></SelectTrigger>
                      <SelectContent>{contacts.map((contact) => <SelectItem key={contact.id} value={contact.id}>{contact.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <FieldError id="debt-contact-error" errors={errors.contact_id ? [errors.contact_id] : undefined} />
                  </Field>
                )} />
                <Field>
                  <FieldLabel htmlFor="debt-direction">{t('pages.debts.direction')}</FieldLabel>
                  <select id="debt-direction" className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm" aria-invalid={Boolean(errors.direction)} {...register('direction')}>
                    <option value="they_owe_me">{t('pages.debts.they_owe_me')}</option>
                    <option value="i_owe_them">{t('pages.debts.i_owe_them')}</option>
                  </select>
                  <FieldError errors={errors.direction ? [errors.direction] : undefined} />
                </Field>
                {(['amount', 'currency', 'description', 'due_date'] as const).map((name) => <Field key={name} data-invalid={Boolean(errors[name])}>
                  <FieldLabel htmlFor={`debt-${name}`}>{t(`pages.debts.${name}`)}</FieldLabel>
                  <Input id={`debt-${name}`} type={name === 'amount' ? 'number' : name === 'due_date' ? 'date' : 'text'}
                    step={name === 'amount' ? 'any' : undefined}
                    aria-invalid={Boolean(errors[name])} aria-describedby={`debt-${name}-error`}
                    {...register(name, name === 'amount' ? { valueAsNumber: true } : {})} />
                  <FieldError id={`debt-${name}-error`} errors={errors[name] ? [errors[name]] : undefined} />
                </Field>)}
                {dateRequired && <p className="text-sm text-muted-foreground">{t('pages.debts.dateHint')}</p>}
              </FieldGroup>
            </fieldset>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" disabled={isSaving} onClick={() => setOpen(false)}>{t('pages.debts.cancel')}</Button>
              <Button type="submit" disabled={isSaving || contactsUnavailable}>{t(isSaving ? 'pages.debts.saving' : 'pages.debts.save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deletingDebt !== null} onOpenChange={(value) => { if (!value && !isDeleting) setDeletingDebt(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('pages.debts.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('pages.debts.deleteDescription', { amount: deletingDebt?.amount, currency: deletingDebt?.currency })}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t('pages.debts.cancel')}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={isDeleting} onClick={(event) => { event.preventDefault(); void handleDelete() }}>
              {t(isDeleting ? 'pages.debts.deleting' : 'pages.debts.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={viewingId !== null} onOpenChange={(value) => { if (!value && !paymentSaving) setViewingId(null) }}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl" showCloseButton={!paymentSaving}>
          <DialogHeader><DialogTitle>{t('pages.debts.detailsTitle')}</DialogTitle><DialogDescription>{viewingId}</DialogDescription></DialogHeader>
          {detailsLoading && !viewedDebt && <Skeleton className="h-40 w-full" />}
          {detailsError && <div role="alert" className="space-y-3"><p>{t('pages.debts.detailsError')}</p><Button variant="outline" disabled={detailsLoading} onClick={() => void refetchDetails()}>{t('pages.debts.retry')}</Button></div>}
          {viewedDebt && <><dl className="grid grid-cols-[auto_1fr] gap-3 text-sm">
            <dt className="text-muted-foreground">{t('pages.debts.contact')}</dt><dd className="break-words">{contactName(viewedDebt.contact_id)}</dd>
            <dt className="text-muted-foreground">{t('pages.debts.direction')}</dt><dd>{t(`pages.debts.${viewedDebt.direction}`)}</dd>
            <dt className="text-muted-foreground">{t('pages.debts.originalAmount')}</dt><dd>{viewedDebt.amount} {viewedDebt.currency}</dd>
            <dt className="text-muted-foreground">{t('common.status')}</dt><dd>{t(`pages.debts.${viewedDebt.status}`)}</dd>
            <dt className="text-muted-foreground">{t('pages.debts.due_date')}</dt><dd>{viewedDebt.due_date?.slice(0, 10) ?? '—'}</dd>
            <dt className="text-muted-foreground">{t('pages.debts.description')}</dt><dd className="min-w-0 whitespace-pre-wrap break-words">{viewedDebt.description || '—'}</dd>
          </dl>
          <p className="text-sm text-muted-foreground">{t('pages.debts.financialHint')}</p>
          {viewedDebt.status === 'paid' && <p role="status" className="rounded-lg bg-success/10 p-3 text-sm text-success">{t('pages.debts.archivedNotice')}</p>}
          <DebtPayments key={viewedDebt.id} debt={viewedDebt} disabled={detailsLoading || detailsError} readOnly={viewedDebt.status === 'paid'} onSavingChange={setPaymentSaving} />
          </>}
          <DialogFooter><Button variant="outline" disabled={paymentSaving} onClick={() => setViewingId(null)}>{t('pages.debts.close')}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
