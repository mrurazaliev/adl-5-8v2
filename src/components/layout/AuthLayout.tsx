import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const sideGlowStyle = {
  backgroundImage: [
    'radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.14) 0%, transparent 42%)',
    'radial-gradient(circle at 100% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 38%)',
    'radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.12) 0%, transparent 42%)',
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
    <div className="grid min-h-[calc(100svh-8rem)] lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
      <aside className="relative isolate hidden overflow-hidden bg-[#111820] text-white lg:grid lg:grid-rows-[auto_1fr] lg:p-12 xl:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={sideGlowStyle}
        />

        <span className="relative text-sm font-semibold tracking-[0.02em]">
          {t('appTitle')}
        </span>

        <div className="relative flex items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-white xl:text-5xl">
              {t('auth.sideTitle')}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
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
