import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Mail, Pencil, Phone, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from '@/features/contacts/contactsApi'
import type { Contact } from '@/features/contacts/contactsApi'
import {
  createContactSchema,
  type ContactFormValues,
} from '@/features/contacts/contactsSchema'

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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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

type DialogMode = 'add' | 'edit' | null

function toNullable(value: string): string | null {
  const normalized = value.trim()

  return normalized ? normalized : null
}

export default function ContactsPage() {
  const { t } = useTranslation()

  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null)
  const [search, setSearch] = useState('')

  const {
    data: contacts = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetContactsQuery()

  const [createContact, { isLoading: isCreating }] = useCreateContactMutation()
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation()
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(t)),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      note: '',
    },
  })

  const { errors } = form.formState

  useEffect(() => {
    if (dialogMode === null) return

    form.reset({
      name: editingContact?.name ?? '',
      phone: editingContact?.phone ?? '',
      email: editingContact?.email ?? '',
      note: editingContact?.note ?? '',
    })
  }, [dialogMode, editingContact, form])

  const filteredContacts = contacts.filter((contact) => {
    const query = search.trim().toLowerCase()

    return (
      contact.name.toLowerCase().includes(query) ||
      (contact.email ?? '').toLowerCase().includes(query) ||
      (contact.phone ?? '').toLowerCase().includes(query)
    )
  })

  const isSaving = isCreating || isUpdating

  function handleOpenAdd() {
    setEditingContact(null)
    setDialogMode('add')
  }

  function handleOpenEdit(contact: Contact) {
    setEditingContact(contact)
    setDialogMode('edit')
  }

  function handleCloseDialog() {
    setDialogMode(null)
    setEditingContact(null)
  }

  async function handleSubmitForm(values: ContactFormValues) {
    const payload = {
      name: values.name.trim(),
      phone: toNullable(values.phone),
      email: toNullable(values.email),
      note: toNullable(values.note),
    }

    try {
      if (dialogMode === 'edit' && editingContact) {
        await updateContact({ id: editingContact.id, ...payload }).unwrap()
        toast.success(t('pages.contacts.messages.updated'))
      } else {
        await createContact(payload).unwrap()
        toast.success(t('pages.contacts.messages.created'))
      }

      handleCloseDialog()
    } catch {
      toast.error(t('pages.contacts.messages.saveError'))
    }
  }

  async function handleDelete() {
    if (!deletingContact) return

    try {
      await deleteContact(deletingContact.id).unwrap()
      toast.success(t('pages.contacts.messages.deleted'))
      setDeletingContact(null)
    } catch {
      toast.error(t('pages.contacts.messages.deleteError'))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.contacts.title')}
        description={t('pages.contacts.subtitle')}
        actions={
          <Button type="button" onClick={handleOpenAdd}>
            <Plus className="size-4" />
            {t('common.add')}
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('pages.contacts.searchPlaceholder')}
          className="h-10 min-w-0 flex-1"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
          />
          {t('pages.contacts.refresh')}
        </Button>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-48 animate-pulse">
              <CardContent className="space-y-4 pt-6">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center gap-3 py-10">
            <p className="text-sm text-destructive">
              {t('pages.contacts.loadError')}
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
            >
              {t('pages.contacts.retry')}
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && contacts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <p className="text-lg font-semibold">
              {t('pages.contacts.emptyTitle')}
            </p>

            <p className="text-center text-sm text-muted-foreground">
              {t('pages.contacts.emptyDescription')}
            </p>

            <Button type="button" onClick={handleOpenAdd}>
              <Plus className="size-4" />
              {t('pages.contacts.addContact')}
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading &&
        !isError &&
        contacts.length > 0 &&
        filteredContacts.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-sm text-muted-foreground">
                {t('pages.contacts.noResults')}
              </p>
            </CardContent>
          </Card>
        )}

      {!isLoading && !isError && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredContacts.map((contact) => (
            <Card
              key={contact.id}
              className="border-border/70 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start gap-3">
                <Avatar className="size-11">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {contact.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-base">
                    {contact.name}
                  </CardTitle>

                  <CardDescription className="truncate font-mono text-xs">
                    {contact.id}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  {contact.phone && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-4 shrink-0" />
                      <span>{contact.phone}</span>
                    </p>
                  )}

                  {contact.email && (
                    <p className="flex items-center gap-2 truncate text-muted-foreground">
                      <Mail className="size-4 shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </p>
                  )}

                  {contact.note && (
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {contact.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1 border-t border-border/70 pt-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(contact)}
                  >
                    <Pencil className="size-4" />
                    {t('common.edit')}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeletingContact(contact)}
                  >
                    <Trash2 className="size-4" />
                    {t('pages.contacts.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open && !isSaving) handleCloseDialog()
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'edit'
                ? t('pages.contacts.editTitle')
                : t('pages.contacts.addTitle')}
            </DialogTitle>

            <DialogDescription>
              {dialogMode === 'edit'
                ? t('pages.contacts.editDescription')
                : t('pages.contacts.addDescription')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <FieldGroup>
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel htmlFor="contact-name">
                  {t('pages.contacts.fields.name')}
                </FieldLabel>
                <Input
                  id="contact-name"
                  aria-invalid={Boolean(errors.name)}
                  {...form.register('name')}
                />
                <FieldError errors={errors.name ? [errors.name] : undefined} />
              </Field>

              <Field data-invalid={Boolean(errors.phone)}>
                <FieldLabel htmlFor="contact-phone">
                  {t('pages.contacts.fields.phone')}
                </FieldLabel>
                <Input
                  id="contact-phone"
                  aria-invalid={Boolean(errors.phone)}
                  {...form.register('phone')}
                />
                <FieldError
                  errors={errors.phone ? [errors.phone] : undefined}
                />
              </Field>

              <Field data-invalid={Boolean(errors.email)}>
                <FieldLabel htmlFor="contact-email">
                  {t('pages.contacts.fields.email')}
                </FieldLabel>
                <Input
                  id="contact-email"
                  type="email"
                  aria-invalid={Boolean(errors.email)}
                  {...form.register('email')}
                />
                <FieldError
                  errors={errors.email ? [errors.email] : undefined}
                />
              </Field>

              <Field data-invalid={Boolean(errors.note)}>
                <FieldLabel htmlFor="contact-note">
                  {t('pages.contacts.fields.note')}
                </FieldLabel>
                <Input
                  id="contact-note"
                  aria-invalid={Boolean(errors.note)}
                  {...form.register('note')}
                />
                <FieldError errors={errors.note ? [errors.note] : undefined} />
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isSaving}
              >
                {t('pages.contacts.cancel')}
              </Button>

              <Button type="submit" disabled={isSaving}>
                {isSaving
                  ? t('pages.contacts.saving')
                  : t('pages.contacts.save')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deletingContact !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingContact(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('pages.contacts.deleteTitle')}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t('pages.contacts.deleteDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t('pages.contacts.cancel')}
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
                ? t('pages.contacts.deleting')
                : t('pages.contacts.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
