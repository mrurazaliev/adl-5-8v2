import { z } from 'zod'

type Translate = (key: string) => string

export function createLoginSchema(t: Translate) {
  return z.object({
    email: z.email(t('auth.validation.email')),
    password: z.string().min(1, t('auth.validation.passwordRequired')),
  })
}

export function createRegisterSchema(t: Translate) {
  return z.object({
    name: z.string().trim().min(1, t('auth.validation.nameRequired')).max(120, t('auth.validation.nameMax')),
    email: z.email(t('auth.validation.email')),
    password: z.string().min(6, t('auth.validation.passwordLength')).max(128, t('auth.validation.passwordLength')),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('auth.validation.confirmation'), path: ['confirmPassword'],
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>
