import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Folder, Pencil, Plus } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { folders } from '@/mocks/mockData'

type DialogMode = 'create' | 'edit' | null

export default function FoldersPage() {
  const { t } = useTranslation()
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.folders.title')}
        description={t('pages.folders.subtitle')}
        actions={
          <Button type="button" onClick={() => setDialogMode('create')}>
            <Plus />
            {t('common.add')}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {folders.map((folder) => (
          <Card
            key={folder.id}
            className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: folder.color }}
            />
            <CardHeader className="flex flex-row items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                <Folder className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-base">{folder.name}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {folder.id}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="min-h-10 text-sm text-muted-foreground">
                {folder.description}
              </p>
              <div className="flex items-center justify-between border-t border-border/70 pt-3">
                <span className="text-xs text-muted-foreground">
                  Записей: {folder.items}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setDialogMode('edit')}
                >
                  <Pencil />
                  {t('common.manage')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <button
          type="button"
          onClick={() => setDialogMode('create')}
          className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
        >
          <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
            <Plus className="size-5" />
          </span>
          Создать папку
        </button>
      </div>

      <DemoActionDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMode(null)
        }}
        title={
          dialogMode === 'edit' ? 'Управление папкой' : 'Создание папки'
        }
        description="Форма подготовлена как визуальный каркас. Состав полей уточняется после изучения backend."
      />
    </div>
  )
}
