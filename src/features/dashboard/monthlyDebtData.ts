import { z } from 'zod'
import type { Debt, DebtDirection } from '@/features/debts/debtsApi'

export interface MonthlyDebtRecord {
  year: number
  month: number
  currency: string
  direction: DebtDirection
  cents: number
}

export interface MonthlyDebtPoint {
  month: number
  they_owe_me: number
  i_owe_them: number
}

export function prepareMonthlyDebts(debts: Debt[]): MonthlyDebtRecord[] | null {
  const records: MonthlyDebtRecord[] = []
  const timestamp = z.iso.datetime({ offset: true })
  for (const debt of debts) {
    if (!debt || !timestamp.safeParse(debt.created_at).success
      || typeof debt.currency !== 'string' || debt.currency.trim() !== debt.currency
      || debt.currency.length === 0 || debt.currency.length > 8
      || (debt.direction !== 'they_owe_me' && debt.direction !== 'i_owe_them')
      || (typeof debt.amount !== 'number' && typeof debt.amount !== 'string')) return null

    const amount = /^(\d+)(?:\.(\d{1,2}))?$/.exec(String(debt.amount))
    if (!amount) return null
    const cents = Number(amount[1] + (amount[2] ?? '').padEnd(2, '0'))
    if (!Number.isSafeInteger(cents) || cents <= 0) return null
    const date = new Date(debt.created_at)
    if (!Number.isFinite(date.getTime())) return null
    records.push({
      year: date.getFullYear(), month: date.getMonth(),
      currency: debt.currency, direction: debt.direction, cents,
    })
  }
  return records
}

export function groupMonthlyDebts(records: MonthlyDebtRecord[], year: number, currency: string): MonthlyDebtPoint[] | null {
  const months: MonthlyDebtPoint[] = Array.from({ length: 12 }, (_, month) => ({
    month, they_owe_me: 0, i_owe_them: 0,
  }))
  for (const record of records.filter((item) => item.year === year && item.currency === currency)) {
    const month = months[record.month]
    const total = month[record.direction] + record.cents
    if (!Number.isSafeInteger(total)) return null
    month[record.direction] = total
  }
  return months
}

export function formatDebtCents(cents: number, locale: string, currency: string): string {
  const whole = Math.floor(cents / 100).toLocaleString(locale)
  const fraction = String(cents % 100).padStart(2, '0')
  const separator = new Intl.NumberFormat(locale).formatToParts(1.1).find((part) => part.type === 'decimal')?.value ?? '.'
  return `${whole}${separator}${fraction} ${currency}`
}
