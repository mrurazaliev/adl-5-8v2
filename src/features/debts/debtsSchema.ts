import { z } from 'zod'

type Translate = (key: string) => string

export function createDebtSchema(t: Translate, dateRequired = false) {
  return z.object({
    contact_id: z.uuid(t('pages.debts.validation.contact')),
    direction: z.enum(['they_owe_me', 'i_owe_them'], {
      error: t('pages.debts.validation.direction'),
    }),
    amount: z.number({ error: t('pages.debts.validation.amount') })
      .positive(t('pages.debts.validation.amount'))
      .max(1_000_000_000, t('pages.debts.validation.amount')),
    currency: z.string().trim().min(1, t('pages.debts.validation.currency'))
      .max(8, t('pages.debts.validation.currency')),
    description: z.string().max(1000, t('pages.debts.validation.description')),
    due_date: z.string()
      .refine((value) => value === '' || z.iso.date().safeParse(value).success,
        t('pages.debts.validation.date'))
      .refine((value) => !dateRequired || value !== '',
        t('pages.debts.validation.dateRequired')),
  })
}

export type DebtFormValues = z.infer<ReturnType<typeof createDebtSchema>>
