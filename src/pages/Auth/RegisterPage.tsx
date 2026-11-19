import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {t('auth.registerEyebrow')}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('auth.registerTitle')}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t('auth.registerSubtitle')}
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="register-identifier">
              {t('auth.identifier')}
            </FieldLabel>
            <Input
              id="register-identifier"
              type="text"
              placeholder={t('auth.identifierPlaceholder')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="register-password">
              {t('auth.password')}
            </FieldLabel>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.passwordPlaceholder')}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-1 -translate-y-1/2"
                aria-label={
                  showPassword ? t('auth.hidePassword') : t('auth.showPassword')
                }
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="register-confirmation">
              {t('auth.confirmPassword')}
            </FieldLabel>
            <div className="relative">
              <Input
                id="register-confirmation"
                type={showConfirmation ? 'text' : 'password'}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-1 -translate-y-1/2"
                aria-label={
                  showConfirmation
                    ? t('auth.hidePassword')
                    : t('auth.showPassword')
                }
                onClick={() => setShowConfirmation((value) => !value)}
              >
                {showConfirmation ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </Field>
        </FieldGroup>

        <Button type="submit" className="h-10 w-full" disabled>
          {t('auth.registerAction')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          {t('auth.loginLink')}
        </Link>
      </p>

      <p className="rounded-lg border border-dashed border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
        {t('auth.demoSubmitHint')}
      </p>
    </div>
  )
}
