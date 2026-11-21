import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Folder, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useGetFoldersQuery,
  useAddFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  type Folder as FolderItem,
} from '@/features/folders/foldersApi'

import { PageHeader } from '@/components/shared/PageHeader'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

const DEFAULT_FOLDER_COLOR = '#7C3AED'

type FolderFormValues = {
  name: string
  color: string
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = error.data

    if (
      data &&
      typeof data === 'object' &&
      'error' in data &&
      typeof data.error === 'string'
    ) {
      return data.error
    }
  }

  return fallback
}

export default function FoldersPage() {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [deletingFolder, setDeletingFolder] = useState<FolderItem | null>(null)

  const {
    data: folders = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetFoldersQuery()

  const [addFolder, { isLoading: isAdding }] = useAddFolderMutation()

  const [updateFolder, { isLoading: isUpdating }] =
    useUpdateFolderMutation()

  const [deleteFolder, { isLoading: isDeleting }] =
    useDeleteFolderMutation()

  const folderSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t('pages.folders.validation.nameRequired'))
      .max(120, t('pages.folders.validation.nameMax')),

    color: z
      .string()
      .regex(
        /^#[0-9A-Fa-f]{6}$/,
        t('pages.folders.validation.colorInvalid'),
      ),
  })

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),

    defaultValues: {
      name: '',
      color: DEFAULT_FOLDER_COLOR,
    },
  })

  const isSaving = isAdding || isUpdating

  const onSubmit: SubmitHandler<FolderFormValues> = async (data) => {
    if (isSaving) return

    try {
      if (editingId !== null) {
        await updateFolder({
          id: editingId,
          name: data.name.trim(),
          color: data.color,
        }).unwrap()

        toast.success(t('pages.folders.messages.updated'))
      } else {
        await addFolder({
          name: data.name.trim(),
          color: data.color,
        }).unwrap()

        toast.success(t('pages.folders.messages.created'))
      }

      setOpen(false)
      setEditingId(null)
      reset()
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          t('pages.folders.messages.saveError'),
        ),
      )
    }
  }

  function handleOpenAdd() {
    setEditingId(null)

    reset({
      name: '',
      color: DEFAULT_FOLDER_COLOR,
    })

    setOpen(true)
  }

  function handleOpenEdit(folder: FolderItem) {
    setEditingId(folder.id)

    setValue('name', folder.name)
    setValue('color', folder.color ?? DEFAULT_FOLDER_COLOR)

    setOpen(true)
  }

  function handleCloseDialog() {
    if (isSaving) return

    setOpen(false)
    setEditingId(null)
    reset()
  }

  async function handleDelete() {
    if (!deletingFolder || isDeleting) return

    try {
      await deleteFolder(deletingFolder.id).unwrap()

      toast.success(t('pages.folders.messages.deleted'))

      setDeletingFolder(null)
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          t('pages.folders.messages.deleteError'),
        ),
      )
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.folders.title')}
        description={t('pages.folders.subtitle')}
        actions={
          <Button type="button" onClick={handleOpenAdd}>
            <Plus className="size-4" />
            {t('common.add')}
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {t('pages.folders.count', {
            count: folders.length,
          })}
        </p>

      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-52 overflow-hidden">
              <Skeleton className="h-1.5 w-full rounded-none" />

              <CardContent className="space-y-4 pt-6">
                <Skeleton className="size-10 rounded-xl" />

                <Skeleton className="h-4 w-2/3" />

                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center gap-3 py-10">
            <p className="text-sm text-destructive">
              {t('pages.folders.loadError')}
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
              disabled={isFetching}
            >
              {t('pages.folders.retry')}
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && folders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <p className="text-lg font-semibold">
              {t('pages.folders.emptyTitle')}
            </p>

            <p className="text-center text-sm text-muted-foreground">
              {t('pages.folders.emptyDescription')}
            </p>

            <Button type="button" onClick={handleOpenAdd}>
              <Plus className="size-4" />

              {t('pages.folders.addFolder')}
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && folders.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {folders.map((folder) => (
            <Card
              key={folder.id}
              className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="h-1.5 w-full"
                style={{
                  backgroundColor:
                    folder.color ?? 'var(--muted)',
                }}
              />

              <CardHeader className="flex flex-row items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  <Folder className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-base">
                    {folder.name}
                  </CardTitle>

                  <CardDescription className="truncate font-mono text-xs">
                    {folder.id}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="min-h-8 text-sm text-muted-foreground">
                  {folder.color ?? t('pages.folders.noColor')}
                </p>

                <div className="flex items-center justify-end gap-1 border-t border-border/70 pt-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(folder)}
                  >
                    <Pencil className="size-4" />

                    {t('common.edit')}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeletingFolder(folder)}
                  >
                    <Trash2 className="size-4" />

                    {t('pages.folders.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
          >
            <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
              <Plus className="size-5" />
            </span>

            {t('pages.folders.addFolder')}
          </button>
        </div>
      )}

      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            handleCloseDialog()
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId !== null
                ? t('pages.folders.editTitle')
                : t('pages.folders.addTitle')}
            </DialogTitle>

            <DialogDescription>
              {editingId !== null
                ? t('pages.folders.editDescription')
                : t('pages.folders.addDescription')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel htmlFor="folder-name">
                  {t('pages.folders.fields.name')}
                </FieldLabel>

                <Input
                  id="folder-name"
                  aria-invalid={Boolean(errors.name)}
                  {...register('name')}
                />

                <FieldError
                  errors={errors.name ? [errors.name] : undefined}
                />
              </Field>

              <Field data-invalid={Boolean(errors.color)}>
                <FieldLabel htmlFor="folder-color">
                  {t('pages.folders.fields.color')}
                </FieldLabel>

                <Input
                  id="folder-color"
                  type="color"
                  className="h-10 cursor-pointer p-1"
                  aria-invalid={Boolean(errors.color)}
                  {...register('color')}
                />

                <FieldError
                  errors={errors.color ? [errors.color] : undefined}
                />
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isSaving}
              >
                {t('pages.folders.cancel')}
              </Button>

              <Button type="submit" disabled={isSaving}>
                {isSaving
                  ? t('pages.folders.saving')
                  : t('pages.folders.save')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deletingFolder !== null}
        onOpenChange={(value) => {
          if (!value && !isDeleting) {
            setDeletingFolder(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('pages.folders.deleteTitle')}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t('pages.folders.deleteDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t('pages.folders.cancel')}
            </AlertDialogCancel>

            <AlertDialogAction
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault()
                void handleDelete()
              }}
            >
              {isDeleting
                ? t('pages.folders.deleting')
                : t('pages.folders.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
