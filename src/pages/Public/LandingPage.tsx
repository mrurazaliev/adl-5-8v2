import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CreditCard, Receipt, Sparkles, Users, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface FeatureItem {
  icon: LucideIcon
  titleKey: string
  descriptionKey: string
}

const gridStyle = {
  backgroundImage:
    'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

export default function LandingPage() {
  const { t } = useTranslation()

  const features: FeatureItem[] = [
    {
      icon: CreditCard,
      titleKey: 'landing.features.debts.title',
      descriptionKey: 'landing.features.debts.description',
    },
    {
      icon: Users,
      titleKey: 'landing.features.contacts.title',
      descriptionKey: 'landing.features.contacts.description',
    },
    {
      icon: Receipt,
      titleKey: 'landing.features.payments.title',
      descriptionKey: 'landing.features.payments.description',
    },
  ]

  return (
    <div className="min-h-svh bg-background">
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={gridStyle}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-[10%] size-[30rem] rounded-full bg-primary/25 blur-3xl motion-safe:animate-pulse"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-24 size-[26rem] rounded-full bg-secondary/20 blur-3xl motion-safe:animate-pulse motion-safe:[animation-delay:1.5s]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[36rem] -translate-x-1/2 bg-linear-to-t from-primary/10 to-transparent blur-2xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-32">
          <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
            {t('landing.hero.eyebrow')}
          </p>

          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">{t('landing.hero.titleLine1')}</span>
            <span className="mt-1 block bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('landing.hero.titleLine2')}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('landing.hero.description')}
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="h-11 w-full px-6 sm:w-auto">
              <Link to="/register">{t('landing.hero.primaryCta')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 w-full px-6 sm:w-auto"
            >
              <Link to="/register">{t('landing.hero.secondaryCta')}</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">{t('demoMode')}</p>
        </div>
      </section>

      <section
        id="features"
        aria-labelledby="landing-features-title"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="landing-features-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t('landing.features.title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('landing.features.subtitle')}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.titleKey}
              className="h-full border-border/70 shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none"
            >
              <CardHeader>
                <span className="mb-2 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <CardTitle className="text-lg">{t(feature.titleKey)}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {t(feature.descriptionKey)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/70 bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">{t('appTitle')}</p>
              <p className="text-xs text-muted-foreground">{t('demoMode')}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link
              to="/login"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('auth.login')}
            </Link>
            <Link
              to="/register"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('auth.register')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
