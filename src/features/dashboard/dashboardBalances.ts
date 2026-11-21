import type { Debt } from '@/features/debts/debtsApi'
import type { Payment } from '@/features/payments/paymentsApi'

export type BalanceDebt = Pick<Debt, 'id' | 'user_id' | 'contact_id' | 'amount' | 'currency' | 'direction'>

export interface DebtPaymentHistory {
  debt: BalanceDebt
  payments: Payment[]
}

export interface BalanceAmounts {
  theyOweMeCents: string
  iOweThemCents: string
  netBalanceCents: string
}

export function amountToCents(value: unknown): bigint | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null
  const match = /^(\d{1,12})(?:\.(\d{1,2}))?$/.exec(String(value))
  if (!match) return null
  const cents = BigInt(match[1] + (match[2] ?? '').padEnd(2, '0'))
  return cents > 0n ? cents : null
}

export function getBalanceDebts(data: unknown): BalanceDebt[] | null {
  if (!Array.isArray(data)) return null
  const unique = new Map<string, BalanceDebt>()
  for (const debt of data as BalanceDebt[]) {
    if (!debt || typeof debt.id !== 'string' || !debt.id
      || typeof debt.user_id !== 'string' || !debt.user_id
      || typeof debt.contact_id !== 'string' || !debt.contact_id
      || typeof debt.currency !== 'string' || debt.currency.trim() !== debt.currency
      || debt.currency.length < 1 || debt.currency.length > 8
      || (debt.direction !== 'they_owe_me' && debt.direction !== 'i_owe_them')
      || amountToCents(debt.amount) === null) return null
    const previous = unique.get(debt.id)
    if (previous && (previous.user_id !== debt.user_id || previous.contact_id !== debt.contact_id
      || previous.currency !== debt.currency || previous.direction !== debt.direction
      || amountToCents(previous.amount) !== amountToCents(debt.amount))) return null
    unique.set(debt.id, debt)
  }
  return [...unique.values()]
}

export function calculateDashboardBalances(histories: DebtPaymentHistory[], currency: string): BalanceAmounts | null {
  let theyOweMe = 0n
  let iOweThem = 0n
  const debts = new Set<string>()
  const payments = new Map<string, { debtId: string; cents: bigint }>()
  for (const { debt, payments: history } of histories) {
    if (debt.currency !== currency) continue
    const original = amountToCents(debt.amount)
    if (original === null || debts.has(debt.id) || !Array.isArray(history)
      || (debt.direction !== 'they_owe_me' && debt.direction !== 'i_owe_them')) return null
    debts.add(debt.id)
    let totalPaid = 0n
    for (const payment of history) {
      if (!payment || typeof payment.id !== 'string' || !payment.id
        || payment.debt_id !== debt.id || payment.user_id !== debt.user_id) return null
      const cents = amountToCents(payment.amount)
      if (cents === null) return null
      const previous = payments.get(payment.id)
      if (previous) {
        if (previous.debtId !== debt.id || previous.cents !== cents) return null
        continue
      }
      payments.set(payment.id, { debtId: debt.id, cents })
      totalPaid += cents
    }
    const remaining = original - totalPaid
    const signed = debt.direction === 'they_owe_me' ? remaining : -remaining
    if (signed > 0n) theyOweMe += signed
    else iOweThem -= signed
  }
  return {
    theyOweMeCents: theyOweMe.toString(),
    iOweThemCents: iOweThem.toString(),
    netBalanceCents: (theyOweMe - iOweThem).toString(),
  }
}

export function formatBalanceCents(value: string, locale: string, currency: string, signed = false): string {
  const cents = BigInt(value)
  const absolute = cents < 0n ? -cents : cents
  const whole = (absolute / 100n).toLocaleString(locale)
  const fraction = String(absolute % 100n).padStart(2, '0')
  const separator = new Intl.NumberFormat(locale).formatToParts(1.1).find((part) => part.type === 'decimal')?.value ?? '.'
  const sign = cents < 0n ? '−' : signed && cents > 0n ? '+' : ''
  return `${sign}${whole}${separator}${fraction} ${currency}`
}
