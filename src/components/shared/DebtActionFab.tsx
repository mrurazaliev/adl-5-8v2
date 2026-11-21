import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DebtType = 'owed-to-me' | 'i-owe'

const debtActions: Array<{
  type: DebtType
  labelKey: string
  descriptionKey: string
}> = [
  {
    type: 'owed-to-me',
    labelKey: 'pages.dashboard.owedToMe',
    descriptionKey: 'pages.dashboard.owedToMeDescription',
  },
  {
    type: 'i-owe',
    labelKey: 'pages.dashboard.iOwe',
    descriptionKey: 'pages.dashboard.iOweDescription',
  },
]

export function DebtActionFab() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [debtType, setDebtType] = useState<DebtType | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const activeAction = debtActions.find((action) => action.type === debtType)

  return (
    <>
      <div
        ref={containerRef}
        className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6"
      >
        <div
          id="dashboard-debt-fab-menu"
          role="menu"
          aria-label={t('pages.dashboard.createDebt')}
          aria-orientation="vertical"
          aria-hidden={!menuOpen}
          className={cn(
            'flex flex-col items-end gap-2 transition-all duration-200 ease-out motion-reduce:transition-none',
            menuOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-2 scale-95 opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100',
          )}
        >
          {debtActions.map((action) => (
            <Button
              key={action.type}
              type="button"
              role="menuitem"
              size="sm"
              tabIndex={menuOpen ? 0 : -1}
              className="whitespace-nowrap rounded-full shadow-md"
              aria-label={t(action.labelKey)}
              onClick={() => {
                setMenuOpen(false)
                setDebtType(action.type)
              }}
            >
              {t(action.labelKey)}
            </Button>
          ))}
        </div>

        <Button
          type="button"
          size="icon-lg"
          className="size-12 rounded-full shadow-xl"
          aria-label={
            menuOpen
              ? t('pages.dashboard.closeDebtMenu')
              : t('pages.dashboard.openDebtMenu')
          }
          aria-expanded={menuOpen}
          aria-controls="dashboard-debt-fab-menu"
          aria-haspopup="menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <Plus
            className={cn(
              'size-5 transition-transform duration-200 ease-out motion-reduce:transition-none',
              menuOpen && 'rotate-45',
            )}
          />
        </Button>
      </div>

      <DemoActionDialog
        open={debtType !== null}
        onOpenChange={(open) => {
          if (!open) setDebtType(null)
        }}
        title={activeAction ? t(activeAction.labelKey) : ''}
        description={activeAction ? t(activeAction.descriptionKey) : ''}
        saveLabel={t('common.save')}
      />
    </>
  )
}
