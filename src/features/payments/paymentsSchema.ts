import { z } from 'zod'

type Translate = (key: string) => string

export function createPaymentSchema(t: Translate) {
  return z.object({
    amount: z.number({ error: t('pages.payments.validation.amount') })
      .positive(t('pages.payments.validation.amount'))
      .max(1_000_000_000, t('pages.payments.validation.amount')),
    note: z.string().max(500, t('pages.payments.validation.note')),
    paid_at: z.string().refine(
      (value) => value === '' || (
        z.iso.datetime({ local: true, precision: -1 }).safeParse(value).success
        && Number.isFinite(new Date(value).getTime())
      ),
      t('pages.payments.validation.date'),
    ),
  })
}

export type PaymentFormValues = z.infer<ReturnType<typeof createPaymentSchema>>
