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
import { createRegisterSchema, type RegisterFormValues } from '@/features/auth/registrSchema'
import { setCredentials } from '@/features/auth/authSlice'
import { useRegisterMutation } from '@/features/auth/authApi'

export default function RegisterPage() {
  const { t } = useTranslation()
  const [registerUser, { isLoading }] = useRegisterMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [serverError, setServerError] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    if (isLoading) return
    setServerError(false)
    try {
      const response = await registerUser({ name: data.name, email: data.email, password: data.password }).unwrap()
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
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{t('auth.registerEyebrow')}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('auth.registerTitle')}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{t('auth.registerSubtitle')}</p>
      </div>
      <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {(['name', 'email'] as const).map((field) => <Field key={field} data-invalid={Boolean(errors[field])}>
            <FieldLabel htmlFor={`register-${field}`}>{t(`auth.${field}`)}</FieldLabel>
            <Input id={`register-${field}`} type={field === 'email' ? 'email' : 'text'} placeholder={t(`auth.${field}Placeholder`)} autoComplete={field} aria-invalid={Boolean(errors[field])} {...register(field)} />
            <FieldError errors={errors[field] ? [errors[field]] : undefined} />
          </Field>)}
          {(['password', 'confirmPassword'] as const).map((field) => {
            const visible = field === 'password' ? showPassword : showConfirmation
            return <Field key={field} data-invalid={Boolean(errors[field])}>
              <FieldLabel htmlFor={`register-${field}`}>{t(`auth.${field}`)}</FieldLabel>
              <div className="relative">
                <Input id={`register-${field}`} type={visible ? 'text' : 'password'} placeholder={t(`auth.${field}Placeholder`)} autoComplete="new-password" className="pr-10" aria-invalid={Boolean(errors[field])} {...register(field)} />
                <Button type="button" variant="ghost" size="icon-sm" className="absolute top-1/2 right-1 -translate-y-1/2" aria-label={t(visible ? 'auth.hidePassword' : 'auth.showPassword')} onClick={() => field === 'password' ? setShowPassword(!showPassword) : setShowConfirmation(!showConfirmation)}>{visible ? <EyeOff /> : <Eye />}</Button>
              </div>
              <FieldError errors={errors[field] ? [errors[field]] : undefined} />
            </Field>
          })}
        </FieldGroup>
        {serverError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{t('auth.registerError')}</p>}
        <Button type="submit" className="h-10 w-full" disabled={isLoading || isSubmitting}>{t(isLoading || isSubmitting ? 'auth.registering' : 'auth.registerAction')}</Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">{t('auth.hasAccount')}{' '}<Link to="/login" className="font-medium text-primary hover:underline">{t('auth.loginLink')}</Link></p>
    </div>
  )
}
