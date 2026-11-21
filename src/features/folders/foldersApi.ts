import { baseApi } from '@/api/baseApi'

export interface Folder {
  id: string
  user_id: string
  name: string
  color: string | null
  created_at: string
  updated_at: string
}

export interface FolderPayload {
  name: string
  color?: string | null
}

export interface UpdateFolderArgs extends Partial<FolderPayload> {
  id: string
}

export const foldersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getFolders: builder.query<Folder[], void>({
      query: () => '/api/folders',
      providesTags: ['Folder'],
    }),

    getFolderById: builder.query<Folder, string>({
      query: (id) => `/api/folders/${id}`,
      providesTags: ['Folder'],
    }),

    addFolder: builder.mutation<Folder, FolderPayload>({
      query: (newFolder) => ({
        url: '/api/folders',
        method: 'POST',
        body: newFolder,
      }),
      invalidatesTags: ['Folder'],
    }),

    updateFolder: builder.mutation<Folder, UpdateFolderArgs>({
      query: ({ id, ...updatedData }) => ({
        url: `/api/folders/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Folder', 'Contact'],
    }),

    deleteFolder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/folders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folder', 'Contact'],
    }),

  }),
})

export const {
  useGetFoldersQuery,
  useGetFolderByIdQuery,
  useAddFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = foldersApi