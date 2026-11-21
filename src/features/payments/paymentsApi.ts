import { baseApi } from '@/api/baseApi'
import type { Debt } from '@/features/debts/debtsApi'

export interface Payment {
  id: string
  debt_id: string
  user_id: string
  amount: number
  note: string | null
  paid_at: string
  created_at: string
}

export interface AddPaymentArgs {
  debtId: string
  amount: number
  note?: string
  paid_at?: string
}

export interface AddPaymentResponse {
  payment: Payment
  debt: Debt
}

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<Payment[], string>({
      query: (debtId) => `/api/debts/${debtId}/payments`,
      providesTags: ['Payment'],
    }),
    addPayment: builder.mutation<AddPaymentResponse, AddPaymentArgs>({
      query: ({ debtId, ...newPayment }) => ({
        url: `/api/debts/${debtId}/payments`,
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: ['Payment', 'Debt', 'Dashboard'],
    }),
  }),
})

export const { useGetPaymentsQuery, useAddPaymentMutation } = paymentsApi
