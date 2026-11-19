import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, RotateCcw } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { EmptyState } from '@/components/shared/EmptyState'
import { FilterBar } from '@/components/shared/FilterBar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { archive } from '@/mocks/mockData'

type DialogMode = 'view' | 'restore' | null

export default function ArchivePage() {
  const { t } = useTranslation()
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.archive.title')}
        description={t('pages.archive.subtitle')}
      />

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>{t('pages.archive.title')}</CardTitle>
          <CardDescription>
            Действия с архивными записями показаны в демо-режиме
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FilterBar
            searchPlaceholder={`${t('common.search')}: ${t('nav.archive')}`}
            filters={[
              {
                label: 'Тип записи',
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'debt', label: 'Долг' },
                  { value: 'payment', label: 'Платёж' },
                  { value: 'folder', label: 'Папка' },
                  { value: 'user', label: 'Пользователь' },
                ],
              },
            ]}
          />

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
              <TabsTrigger value="empty">Пустой список</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Запись</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Дата архивации</TableHead>
                    <TableHead>Причина</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archive.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">{row.id}</TableCell>
                      <TableCell className="font-medium whitespace-nowrap">
                        {row.title}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{row.type}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {row.archivedAt}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{row.reason}</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`${t('common.view')} ${row.id}`}
                            onClick={() => setDialogMode('view')}
                          >
                            <Eye />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`${t('common.restore')} ${row.id}`}
                            onClick={() => setDialogMode('restore')}
                          >
                            <RotateCcw />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="empty">
              <EmptyState
                title="Архив пуст"
                description="Здесь появится сообщение, когда в архиве не будет записей."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <DemoActionDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMode(null)
        }}
        title={
          dialogMode === 'restore'
            ? 'Восстановление записи'
            : 'Просмотр архивной записи'
        }
        description="Действие показано как демо. Изменение данных появится после подключения backend."
      />
    </div>
  )
}
