import { baseApi } from '@/api/baseApi'

export interface UpcomingDebt {
  id: string
  amount: number
  currency: string
  direction: 'they_owe_me' | 'i_owe_them'
  due_date: string | null
  status: 'pending' | 'partial' | 'paid'
  contact_name: string
}

export interface DashboardSummary {
  totals: {
    they_owe_me: number
    i_owe_them: number
  }
  outstanding: {
    they_owe_me: number
    i_owe_them: number
    net_balance: number
  }
  counts: {
    pending: number
    partial: number
    paid: number
    total: number
  }
  contacts_count: number
  upcoming_due: UpcomingDebt[]
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => '/api/dashboard/summary',
      providesTags: ['Dashboard'],
    }),
  }),
})

export const { useGetDashboardSummaryQuery } = dashboardApi
