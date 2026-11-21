import { baseApi } from '@/api/baseApi'
import type { Payment } from '@/features/payments/paymentsApi'
import { calculateDashboardBalances, getBalanceDebts } from '@/features/dashboard/dashboardBalances'
import type { BalanceAmounts, DebtPaymentHistory } from '@/features/dashboard/dashboardBalances'

export const DASHBOARD_BALANCE_DEBT_LIMIT = 500
export const DASHBOARD_BALANCE_CONCURRENCY = 4

export interface DashboardBalances extends BalanceAmounts {
  currency: string
  currencies: string[]
  debtCount: number
}

export const dashboardBalancesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardBalances: builder.query<DashboardBalances, string>({
      async queryFn(currency, api, _extraOptions, baseQuery) {
        if (!currency || currency.trim() !== currency || currency.length > 8) {
          return { error: { status: 'CUSTOM_ERROR', error: 'BALANCE_INVALID_DATA' } }
        }
        const response = await baseQuery('/api/debts')
        if (response.error) return { error: response.error }
        const debts = getBalanceDebts(response.data)
        if (!debts) return { error: { status: 'CUSTOM_ERROR', error: 'BALANCE_INVALID_DATA' } }
        const currencies = [...new Set(['TJS', currency, ...debts.map((debt) => debt.currency)])].sort()
        const selected = debts.filter((debt) => debt.currency === currency)
        if (selected.length > DASHBOARD_BALANCE_DEBT_LIMIT) {
          return { error: { status: 'CUSTOM_ERROR', error: 'BALANCE_LIMIT', data: { currencies } } }
        }
        const histories: DebtPaymentHistory[] = []
        for (let offset = 0; offset < selected.length; offset += DASHBOARD_BALANCE_CONCURRENCY) {
          if (api.signal.aborted) return { error: { status: 'FETCH_ERROR', error: 'Aborted' } }
          const batch = selected.slice(offset, offset + DASHBOARD_BALANCE_CONCURRENCY)
          const responses = await Promise.all(batch.map((debt) => baseQuery(`/api/debts/${encodeURIComponent(debt.id)}/payments`)))
          for (let index = 0; index < responses.length; index += 1) {
            const result = responses[index]
            if (result.error) return { error: result.error }
            if (!Array.isArray(result.data)) return { error: { status: 'CUSTOM_ERROR', error: 'BALANCE_INVALID_DATA' } }
            histories.push({ debt: batch[index], payments: result.data as Payment[] })
          }
        }
        const amounts = calculateDashboardBalances(histories, currency)
        if (!amounts) return { error: { status: 'CUSTOM_ERROR', error: 'BALANCE_INVALID_DATA' } }
        return { data: {
          ...amounts,
          currency,
          currencies,
          debtCount: selected.length,
        } }
      },
      providesTags: ['Debt', 'Payment'],
    }),
  }),
})

export const { useGetDashboardBalancesQuery } = dashboardBalancesApi
