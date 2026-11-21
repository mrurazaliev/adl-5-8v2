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
}

export interface UpdateContactArgs extends ContactPayload {
  id: string
}

const contactListTag = { type: 'Contact' as const, id: 'LIST' }

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => '/api/contacts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Contact' as const, id })),
              contactListTag,
            ]
          : [contactListTag],
    }),

    getContact: builder.query<Contact, string>({
      query: (id) => `/api/contacts/${id}`,
      providesTags: (_, __, id) => [{ type: 'Contact' as const, id }],
    }),

    createContact: builder.mutation<Contact, ContactPayload>({
      query: (body) => ({
        url: '/api/contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [contactListTag],
    }),

    updateContact: builder.mutation<Contact, UpdateContactArgs>({
      query: ({ id, ...body }) => ({
        url: `/api/contacts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Contact' as const, id },
        contactListTag,
      ],
    }),

    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Contact' as const, id },
        contactListTag,
      ],
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
