import { z } from 'zod'

type Translate = (key: string) => string

export function createContactSchema(t: Translate) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('pages.contacts.validation.nameRequired'))
      .max(120, t('pages.contacts.validation.nameMax')),
    phone: z
      .string()
      .trim()
      .max(30, t('pages.contacts.validation.phoneMax'))
      .refine(
        (value) => value === '' || /^[+\d\s()-]*$/.test(value),
        t('pages.contacts.validation.phoneInvalid'),
      ),
    email: z
      .string()
      .trim()
      .max(120, t('pages.contacts.validation.emailMax'))
      .refine(
        (value) => value === '' || z.email().safeParse(value).success,
        t('pages.contacts.validation.emailInvalid'),
      ),
    note: z
      .string()
      .trim()
      .max(500, t('pages.contacts.validation.noteMax')),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>
