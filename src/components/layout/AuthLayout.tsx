import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const sideGlowStyle = {
  backgroundImage: [
    'radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--primary) 28%, transparent) 0%, transparent 55%)',
    'radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--cyan) 14%, transparent) 0%, transparent 48%)',
    'radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--primary) 18%, transparent) 0%, transparent 55%)',
  ].join(', '),
}

const formGridStyle = {
  backgroundImage:
    'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

export function AuthLayout() {
  const { t } = useTranslation()

  return (
    <div className="grid min-h-[calc(100svh-8rem)] min-w-0 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2">
      <aside className="relative isolate hidden overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:grid lg:grid-rows-[auto_1fr] lg:p-12 xl:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={sideGlowStyle}
        />

        <span className="relative text-lg font-extrabold tracking-tight">
          ADL 5:8
        </span>

        <div className="relative flex items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl leading-[1.1] font-extrabold tracking-[-0.03em] text-sidebar-foreground xl:text-5xl">
              {t('auth.sideTitle')}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t('auth.sideDescription')}
            </p>
          </div>
        </div>
      </aside>

      <div className="relative flex items-center justify-center px-4 py-12 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={formGridStyle}
        />
        <div className="relative w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
