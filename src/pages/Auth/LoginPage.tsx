import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/features/auth/authApi'

// Zod Schema
const loginSchema = z.object({
  email: z.email('Введите правильный email'),
  password: z.string().min(1, 'Введите пароль'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Форма прошла валидацию')

    setServerError('')
    setSuccessMessage('')

    try {
      const response = await login(data).unwrap()

      console.log('Вход выполнен:', response.user.name)

      setSuccessMessage('Вход выполнен успешно!')
    } catch {
      setServerError(
        'Не удалось войти. Проверьте email, пароль и соединение с сервером.',
      )
    }
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {t('auth.loginEyebrow')}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('auth.loginTitle')}
        </h1>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      <form
        className="space-y-5"
        noValidate
        onSubmit={handleSubmit(
          onSubmit,
          (validationErrors) => {
            console.log('Ошибки валидации:', validationErrors)
          },
        )}
      >
        <FieldGroup>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="login-email">
              Email
            </FieldLabel>

            <Input
              id="login-email"
              type="email"
              placeholder="Введите email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register('email')}
            />

            {errors.email && (
              <p role="alert" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="login-password">
              {t('auth.password')}
            </FieldLabel>

            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.passwordPlaceholder')}
                autoComplete="current-password"
                className="pr-10"
                aria-invalid={!!errors.password}
                {...register('password')}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-1 -translate-y-1/2"
                aria-label={
                  showPassword
                    ? t('auth.hidePassword')
                    : t('auth.showPassword')
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            {errors.password && (
              <p role="alert" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </Field>
        </FieldGroup>

        {/* Backend Error */}
        {serverError && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {serverError}
          </p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p
            role="status"
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600"
          >
            {successMessage}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="h-10 w-full"
          disabled={isLoading}
          onClick={() => console.log('Кнопка нажата')}
        >
          {isLoading ? 'Выполняется вход...' : t('auth.login')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t('auth.noAccount')}{' '}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          {t('auth.registerLink')}
        </Link>
      </p>
    </div>
  )
}