import { useRef, useState } from 'react'
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { ArrowDownLeft, ArrowUpRight, Check, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { useCreateContactMutation, useGetContactsQuery, type Contact } from '@/features/contacts/contactsApi'
import { useAddDebtMutation, type DebtDirection } from '@/features/debts/debtsApi'
import { createNewDebtSchema, type NewDebtFormValues } from '@/features/debts/debtsSchema'
import { createDebtWithContact } from '@/features/debts/createDebtWithContact'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface CreateDebtDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateDebtDialog({ open, onOpenChange }: CreateDebtDialogProps) {
  const { t } = useTranslation()
  const [directionChosen, setDirectionChosen] = useState(false)
  const [saveError, setSaveError] = useState('')
  const saving = useRef(false)
  const { data: contacts = [], isLoading, isError, refetch } = useGetContactsQuery(undefined, { skip: !open })
  const [createContact, { isLoading: isCreatingContact }] = useCreateContactMutation()
  const [addDebt, { isLoading: isAdding }] = useAddDebtMutation()
  const {
    reset, setValue, register, handleSubmit, control, clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<NewDebtFormValues>({
    resolver: zodResolver(createNewDebtSchema(t)),
    defaultValues: {
      contact_id: '', contact_name: '', create_contact: false,
      direction: 'they_owe_me', amount: 0, currency: 'USD', description: '', due_date: '',
    },
  })
  const [name, contactId, createNew, direction] = useWatch({
    control, name: ['contact_name', 'contact_id', 'create_contact', 'direction'],
  })
  const isSaving = isSubmitting || isCreatingContact || isAdding
  const matches = contacts.filter((contact) => contact.name.toLocaleLowerCase().includes(name.trim().toLocaleLowerCase())).slice(0, 5)

  function handleClose() {
    if (saving.current || isSaving) return
    reset()
    setDirectionChosen(false)
    setSaveError('')
    onOpenChange(false)
  }

  function handleChooseDirection(value: DebtDirection) {
    setValue('direction', value)
    setDirectionChosen(true)
  }

  function handleChooseContact(contact: Contact) {
    setValue('contact_id', contact.id)
    setValue('contact_name', contact.name)
    setValue('create_contact', false)
    clearErrors(['contact_name', 'contact_id'])
  }

  function handleNameChange() {
    setValue('contact_id', '')
    setValue('create_contact', false)
    setSaveError('')
  }

  function handleNewPerson() {
    setValue('create_contact', true)
    clearErrors('contact_name')
  }

  const onSubmit: SubmitHandler<NewDebtFormValues> = async (data) => {
    if (saving.current) return
    saving.current = true
    setSaveError('')
    let contactReady = Boolean(data.contact_id)
    try {
      await createDebtWithContact(
        data,
        (payload) => createContact(payload).unwrap(),
        (payload) => addDebt(payload).unwrap(),
        (id) => { contactReady = true; setValue('contact_id', id) },
      )
      toast.success(t('pages.debts.messages.created'))
      reset()
      setDirectionChosen(false)
      onOpenChange(false)
    } catch {
      const key = !contactReady ? 'contactError' : data.create_contact ? 'contactSavedDebtError' : 'debtError'
      setSaveError(key)
      toast.error(t(`pages.debts.creation.${key}`))
    } finally {
      saving.current = false
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t(directionChosen ? 'pages.debts.addTitle' : 'pages.debts.creation.chooseDirection')}</DialogTitle>
          <DialogDescription>{t(directionChosen ? 'pages.debts.creation.formHint' : 'pages.debts.creation.directionHint')}</DialogDescription>
        </DialogHeader>
        {!directionChosen ? <>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => handleChooseDirection('i_owe_them')} className="space-y-3 rounded-xl border border-border bg-warning/5 p-6 text-left transition-colors hover:border-warning focus-visible:outline-2 focus-visible:outline-ring">
              <ArrowUpRight className="size-8 text-warning" />
              <span className="block font-semibold">{t('pages.debts.i_owe_them')}</span>
              <span className="block text-sm text-muted-foreground">{t('pages.debts.creation.iOweHint')}</span>
            </button>
            <button type="button" onClick={() => handleChooseDirection('they_owe_me')} className="space-y-3 rounded-xl border border-border bg-success/5 p-6 text-left transition-colors hover:border-success focus-visible:outline-2 focus-visible:outline-ring">
              <ArrowDownLeft className="size-8 text-success" />
              <span className="block font-semibold">{t('pages.debts.they_owe_me')}</span>
              <span className="block text-sm text-muted-foreground">{t('pages.debts.creation.theyOweHint')}</span>
            </button>
          </div>
          <DialogFooter><Button type="button" variant="outline" onClick={handleClose}>{t('pages.debts.cancel')}</Button></DialogFooter>
        </> : <form noValidate onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <fieldset disabled={isSaving} className="min-w-0">
            <p className="mb-4 rounded-lg bg-primary/5 px-3 py-2 text-sm font-medium text-primary">{t(`pages.debts.${direction}`)}</p>
            <FieldGroup>
              <Field data-invalid={Boolean(errors.contact_name || errors.contact_id)}>
                <FieldLabel htmlFor="new-debt-person">{t('pages.debts.creation.person')}</FieldLabel>
                <Input id="new-debt-person" autoComplete="off" aria-invalid={Boolean(errors.contact_name || errors.contact_id)} aria-describedby="new-debt-person-hint new-debt-person-error"
                  {...register('contact_name', { onChange: handleNameChange })} />
                <p id="new-debt-person-hint" className="text-xs text-muted-foreground">{t('pages.debts.creation.personHint')}</p>
                {isLoading && <p role="status" className="text-sm text-muted-foreground">{t('pages.debts.contactsLoading')}</p>}
                {isError && <div role="alert" className="space-y-2 text-sm">
                  <p>{t('pages.debts.creation.contactsError')}</p>
                  <Button type="button" variant="outline" size="sm" onClick={() => void refetch()}>{t('pages.debts.retry')}</Button>
                </div>}
                {!contactId && !createNew && <>
                  {!isLoading && !isError && matches.length > 0 && <ul className="space-y-1" aria-label={t('pages.debts.creation.existingPeople')}>
                    {matches.map((contact) => <li key={contact.id}>
                      <button type="button" className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring" onClick={() => handleChooseContact(contact)}>
                        <span className="block break-words font-medium">{contact.name}</span>
                        {(contact.phone || contact.email) && <span className="block break-words text-xs text-muted-foreground">{contact.phone || contact.email}</span>}
                      </button>
                    </li>)}
                  </ul>}
                  {name.trim() && <Button type="button" variant="outline" className="h-auto justify-start whitespace-normal text-left" onClick={handleNewPerson}>
                    <UserPlus className="shrink-0" />{t('pages.debts.creation.newPerson', { name: name.trim() })}
                  </Button>}
                </>}
                {(contactId || createNew) && <p role="status" className="flex items-center gap-2 text-sm text-primary"><Check className="size-4 shrink-0" />{t(contactId ? 'pages.debts.creation.personSelected' : 'pages.debts.creation.personWillCreate')}</p>}
                <FieldError id="new-debt-person-error" errors={[errors.contact_name, errors.contact_id].filter(Boolean)} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                {(['amount', 'currency'] as const).map((field) => <Field key={field} data-invalid={Boolean(errors[field])}>
                  <FieldLabel htmlFor={`new-debt-${field}`}>{t(`pages.debts.${field}`)}</FieldLabel>
                  <Input id={`new-debt-${field}`} type={field === 'amount' ? 'number' : 'text'} step={field === 'amount' ? 'any' : undefined} aria-invalid={Boolean(errors[field])} aria-describedby={`new-debt-${field}-error`} {...register(field, field === 'amount' ? { valueAsNumber: true } : {})} />
                  <FieldError id={`new-debt-${field}-error`} errors={errors[field] ? [errors[field]] : undefined} />
                </Field>)}
              </div>
              {(['description', 'due_date'] as const).map((field) => <Field key={field} data-invalid={Boolean(errors[field])}>
                <FieldLabel htmlFor={`new-debt-${field}`}>{t(`pages.debts.creation.${field}`)}</FieldLabel>
                <Input id={`new-debt-${field}`} type={field === 'due_date' ? 'date' : 'text'} aria-invalid={Boolean(errors[field])} aria-describedby={`new-debt-${field}-error`} {...register(field)} />
                <FieldError id={`new-debt-${field}-error`} errors={errors[field] ? [errors[field]] : undefined} />
              </Field>)}
            </FieldGroup>
          </fieldset>
          {saveError && <p role="alert" className="mt-4 text-sm text-destructive">{t(`pages.debts.creation.${saveError}`)}</p>}
          <DialogFooter className="mt-6">
            <Button type="button" variant="ghost" disabled={isSaving} onClick={() => setDirectionChosen(false)}>{t('pages.debts.creation.back')}</Button>
            <Button type="button" variant="outline" disabled={isSaving} onClick={handleClose}>{t('pages.debts.cancel')}</Button>
            <Button type="submit" disabled={isSaving}>{t(isSaving ? 'pages.debts.saving' : 'pages.debts.save')}</Button>
          </DialogFooter>
        </form>}
      </DialogContent>
    </Dialog>
  )
}
