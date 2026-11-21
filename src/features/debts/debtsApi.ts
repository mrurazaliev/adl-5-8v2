import { baseApi } from '@/api/baseApi'

export type DebtDirection = 'they_owe_me' | 'i_owe_them'
export type DebtStatus = 'pending' | 'partial' | 'paid'

export interface Debt {
  id: string
  user_id: string
  contact_id: string
  direction: DebtDirection
  amount: number | string
  currency: string
  description: string | null
  due_date: string | null
  status: DebtStatus
  created_at: string
  updated_at: string
}

export interface DebtPayload {
  contact_id: string
  direction: DebtDirection
  amount: number
  currency: string
  description?: string
  due_date?: string
}

export interface DebtFilters {
  status?: DebtStatus
  contact_id?: string
  direction?: DebtDirection
}

export const debtsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDebts: builder.query<Debt[], DebtFilters>({
      query: (filters) => ({ url: '/api/debts', params: filters }),
      providesTags: ['Debt'],
    }),
    getDebtById: builder.query<Debt, string>({
      query: (id) => `/api/debts/${id}`,
      providesTags: ['Debt'],
    }),
    addDebt: builder.mutation<Debt, DebtPayload>({
      query: (newDebt) => ({
        url: '/api/debts',
        method: 'POST',
        body: newDebt,
      }),
      invalidatesTags: ['Debt', 'Dashboard'],
    }),
    updateDebt: builder.mutation<Debt, Partial<DebtPayload> & { id: string }>({
      query: ({ id, ...updatedData }) => ({
        url: `/api/debts/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Debt', 'Dashboard'],
    }),
    deleteDebt: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/debts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Debt', 'Dashboard'],
    }),
  }),
})

export const {
  useGetDebtsQuery,
  useGetDebtByIdQuery,
  useAddDebtMutation,
  useUpdateDebtMutation,
  useDeleteDebtMutation,
} = debtsApi
