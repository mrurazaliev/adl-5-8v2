import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { History } from 'lucide-react'
import { toast } from 'sonner'
import type { Debt } from '@/features/debts/debtsApi'
import { useGetPaymentsQuery, useAddPaymentMutation } from '@/features/payments/paymentsApi'
import { createPaymentSchema, type PaymentFormValues } from '@/features/payments/paymentsSchema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DebtPaymentsProps {
  debt: Debt
  disabled: boolean
  onSavingChange: (saving: boolean) => void
}

export function DebtPayments({ debt, disabled, onSavingChange }: DebtPaymentsProps) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const {
    currentData: payments = [], isFetching, isError, refetch,
  } = useGetPaymentsQuery(debt.id, { skip: !open })
  const [addPayment, { isLoading: isAdding }] = useAddPaymentMutation()
  const {
    register, reset, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(createPaymentSchema(t)),
    defaultValues: { amount: 0, note: '', paid_at: '' },
  })
  const isSaving = isAdding || isSubmitting

  const onSubmit: SubmitHandler<PaymentFormValues> = async (data) => {
    if (isAdding || disabled) return
    onSavingChange(true)
    try {
      await addPayment({
        debtId: debt.id,
        amount: data.amount,
        note: data.note || undefined,
        paid_at: data.paid_at ? new Date(data.paid_at).toISOString() : undefined,
      }).unwrap()
      toast.success(t('pages.payments.messages.created'))
      reset()
    } catch {
      toast.error(t('pages.payments.messages.saveError'))
    } finally {
      onSavingChange(false)
    }
  }

  function formatDate(value: string) {
    const date = new Date(value)
    if (!Number.isFinite(date.getTime())) return value
    return date.toLocaleString(i18n.language === 'tj' ? 'tg-TJ' : i18n.language)
  }

  return (
    <section className="min-w-0 space-y-4 border-t border-border pt-4">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        aria-expanded={open}
        aria-controls="debt-payments"
        disabled={isSaving}
        onClick={() => setOpen(!open)}
      >
        <History />
        {t(open ? 'pages.payments.hideHistory' : 'pages.payments.history')}
      </Button>

      {open && <div id="debt-payments" className="space-y-4">
        <Card className="min-w-0 border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>{t('pages.payments.history')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isFetching && payments.length === 0 && <div role="status" aria-label={t('pages.payments.loading')} className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>}
            {isError && <div role="alert" className="space-y-3">
              <p className="text-sm text-destructive">{t('pages.payments.loadError')}</p>
              <Button type="button" variant="outline" disabled={isFetching} onClick={() => void refetch()}>
                {t('pages.payments.retry')}
              </Button>
            </div>}
            {!isFetching && !isError && payments.length === 0 &&
              <p className="text-sm text-muted-foreground">{t('pages.payments.empty')}</p>}
            {!isError && payments.length > 0 && <div className="overflow-x-auto" aria-busy={isFetching}>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>{t('pages.payments.amount')}</TableHead>
                  <TableHead>{t('pages.payments.paidAt')}</TableHead>
                  <TableHead>{t('pages.payments.note')}</TableHead>
                </TableRow></TableHeader>
                <TableBody>{payments.map((payment) => <TableRow key={payment.id}>
                  <TableCell className="whitespace-nowrap tabular-nums">{payment.amount} {debt.currency}</TableCell>
                  <TableCell className="whitespace-nowrap"><time dateTime={payment.paid_at}>{formatDate(payment.paid_at)}</time></TableCell>
                  <TableCell className="max-w-56 whitespace-pre-wrap break-words">{payment.note || '—'}</TableCell>
                </TableRow>)}</TableBody>
              </Table>
            </div>}
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader><CardTitle>{t('pages.payments.addTitle')}</CardTitle></CardHeader>
          <CardContent>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={isSaving || disabled}>
                <FieldGroup>
                  <Field data-invalid={Boolean(errors.amount)}>
                    <FieldLabel htmlFor="payment-amount">{t('pages.payments.amount')} ({debt.currency})</FieldLabel>
                    <Input id="payment-amount" type="number" step="any" aria-invalid={Boolean(errors.amount)} aria-describedby="payment-amount-error" {...register('amount', { valueAsNumber: true })} />
                    <FieldError id="payment-amount-error" errors={errors.amount ? [errors.amount] : undefined} />
                  </Field>
                  <Field data-invalid={Boolean(errors.note)}>
                    <FieldLabel htmlFor="payment-note">{t('pages.payments.note')}</FieldLabel>
                    <Input id="payment-note" aria-invalid={Boolean(errors.note)} aria-describedby="payment-note-error" {...register('note')} />
                    <FieldError id="payment-note-error" errors={errors.note ? [errors.note] : undefined} />
                  </Field>
                  <Field data-invalid={Boolean(errors.paid_at)}>
                    <FieldLabel htmlFor="payment-date">{t('pages.payments.paidAt')}</FieldLabel>
                    <Input id="payment-date" type="datetime-local" step="60" aria-invalid={Boolean(errors.paid_at)} aria-describedby="payment-date-hint payment-date-error" {...register('paid_at')} />
                    <p id="payment-date-hint" className="text-sm text-muted-foreground">{t('pages.payments.dateHint')}</p>
                    <FieldError id="payment-date-error" errors={errors.paid_at ? [errors.paid_at] : undefined} />
                  </Field>
                </FieldGroup>
              </fieldset>
              <Button className="mt-4 w-full" type="submit" disabled={isSaving || disabled}>
                {t(isSaving ? 'pages.payments.saving' : 'pages.payments.addPayment')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>}
    </section>
  )
}
