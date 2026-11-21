import { baseApi } from '@/api/baseApi'

export interface Contact {
  id: string
  user_id: string
  folder_id: string | null
  name: string
  phone: string | null
  email: string | null
  note: string | null
  created_at: string
  updated_at: string
}

export interface ContactPayload {
  name: string
  phone?: string | null
  email?: string | null
  note?: string | null
  folder_id?: string | null
}

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getContacts: builder.query<Contact[], void>({
      query: () => '/api/contacts',
      providesTags: ['Contact'],
    }),

    getContact: builder.query<Contact, string>({
      query: (id) => `/api/contacts/${id}`,
      providesTags: ['Contact'],
    }),

    createContact: builder.mutation<Contact, ContactPayload>({
      query: (newContact) => ({
        url: '/api/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact', 'Dashboard'],
    }),

    updateContact: builder.mutation<
      Contact,
      Partial<ContactPayload> & { id: string }>({
      query: ({ id, ...updatedData }) => ({
        url: `/api/contacts/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Contact', 'Dashboard'],
    }),

    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact', 'Debt', 'Dashboard'],
    }),

  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi
