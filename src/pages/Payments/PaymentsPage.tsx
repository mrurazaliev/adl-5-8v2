import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, Pencil, Plus } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { FilterBar } from '@/components/shared/FilterBar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
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
import { paymentStats, payments } from '@/mocks/mockData'

type DialogMode = 'add' | 'view' | 'edit' | null

export default function PaymentsPage() {
  const { t } = useTranslation()
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.payments.title')}
        description={t('pages.payments.subtitle')}
        actions={
          <Button type="button" onClick={() => setDialogMode('add')}>
            <Plus />
            {t('common.add')}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {paymentStats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>{t('pages.payments.title')}</CardTitle>
          <CardDescription>
            Поиск и фильтры показаны как визуальный каркас
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FilterBar
            searchPlaceholder={`${t('common.search')}: ${t('nav.payments')}`}
            filters={[
              {
                label: t('common.status'),
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'completed', label: 'Завершён' },
                  { value: 'pending', label: 'Ожидает' },
                  { value: 'overdue', label: 'Просрочен' },
                ],
              },
              {
                label: 'Метод',
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'cash', label: 'Наличные' },
                  { value: 'transfer', label: 'Перевод' },
                  { value: 'card', label: 'Карта' },
                ],
              },
            ]}
            actionLabel={t('common.add')}
            onAction={() => setDialogMode('add')}
          />

          <Tabs defaultValue="all">
            <div className="no-scrollbar mb-4 max-w-full overflow-x-auto">
              <TabsList>
                <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
                <TabsTrigger value="completed">Завершённые</TabsTrigger>
                <TabsTrigger value="pending">Ожидающие</TabsTrigger>
                <TabsTrigger value="overdue">Просроченные</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Плательщик</TableHead>
                    <TableHead>Метод</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">{row.id}</TableCell>
                      <TableCell className="font-medium whitespace-nowrap">
                        {row.payer}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{row.method}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.date}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.amount}</TableCell>
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
                            aria-label={`${t('common.edit')} ${row.id}`}
                            onClick={() => setDialogMode('edit')}
                          >
                            <Pencil />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {['completed', 'pending', 'overdue'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  Демонстрационная вкладка. Фильтрация данных появится после
                  подключения backend.
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <DemoActionDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMode(null)
        }}
        title={
          dialogMode === 'edit'
            ? 'Редактирование платежа'
            : dialogMode === 'view'
              ? 'Просмотр платежа'
              : 'Добавление платежа'
        }
        description="Форма подготовлена как визуальный каркас. Состав полей уточняется после изучения backend."
      />
    </div>
  )
}
