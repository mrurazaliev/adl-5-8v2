import { z } from 'zod'

type Translate = (key: string) => string

export function createContactSchema(t: Translate, emailRequired = false) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('pages.contacts.validation.nameRequired'))
      .max(120, t('pages.contacts.validation.nameMax')),
    phone: z
      .string()
      .trim()
      .max(40, t('pages.contacts.validation.phoneMax'))
      .refine(
        (value) => value === '' || /^[+\d\s()-]*$/.test(value),
        t('pages.contacts.validation.phoneInvalid'),
      ),
    email: z
      .string()
      .trim()
      .refine(
        (value) => value === '' || z.email().safeParse(value).success,
        t('pages.contacts.validation.emailInvalid'),
      )
      .refine((value) => !emailRequired || value !== '', t('pages.contacts.validation.emailClearUnsupported')),
    note: z
      .string()
      .trim()
      .max(1000, t('pages.contacts.validation.noteMax')),
    folder_id: z.uuid(t('pages.contacts.validation.folderInvalid')).optional(),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>
