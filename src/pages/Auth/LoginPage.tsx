import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/app/hooks'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/features/auth/authApi'
import { setCredentials } from '@/features/auth/authSlice'
import { createLoginSchema, type LoginFormValues } from '@/features/auth/registrSchema'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(t)), defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (isLoading) return
    setServerError(false)
    try {
      const response = await login(data).unwrap()
      localStorage.setItem('refreshToken', response.refreshToken)
      dispatch(setCredentials({ user: response.user, accessToken: response.accessToken }))
      navigate('/dashboard', { replace: true })
    } catch {
      setServerError(true)
    }
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{t('auth.loginEyebrow')}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('auth.loginTitle')}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{t('auth.loginSubtitle')}</p>
      </div>
      <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="login-email">{t('auth.email')}</FieldLabel>
            <Input id="login-email" type="email" placeholder={t('auth.emailPlaceholder')} autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </Field>
          <Field data-invalid={Boolean(errors.password)}>
            <FieldLabel htmlFor="login-password">{t('auth.password')}</FieldLabel>
            <div className="relative">
              <Input id="login-password" type={showPassword ? 'text' : 'password'} placeholder={t('auth.passwordPlaceholder')} autoComplete="current-password" className="pr-10" aria-invalid={Boolean(errors.password)} {...register('password')} />
              <Button type="button" variant="ghost" size="icon-sm" className="absolute top-1/2 right-1 -translate-y-1/2" aria-label={t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
            </div>
            <FieldError errors={errors.password ? [errors.password] : undefined} />
          </Field>
        </FieldGroup>
        {serverError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{t('auth.loginError')}</p>}
        <Button type="submit" className="h-10 w-full" disabled={isLoading || isSubmitting}>{t(isLoading || isSubmitting ? 'auth.loggingIn' : 'auth.login')}</Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">{t('auth.noAccount')}{' '}<Link to="/register" className="font-medium text-primary hover:underline">{t('auth.registerLink')}</Link></p>
    </div>
  )
}
