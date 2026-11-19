import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Archive, Pencil, Plus } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { FilterBar } from '@/components/shared/FilterBar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/shared/StatCard'
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
import { debtStats, debts } from '@/mocks/mockData'

type DialogMode = 'add' | 'edit' | null

export default function DebtsPage() {
  const { t } = useTranslation()
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.debts.title')}
        description={t('pages.debts.subtitle')}
        actions={
          <Button type="button" onClick={() => setDialogMode('add')}>
            <Plus />
            {t('common.add')}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {debtStats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>{t('pages.debts.title')}</CardTitle>
          <CardDescription>
            Поиск и фильтры показаны как визуальный каркас
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FilterBar
            searchPlaceholder={`${t('common.search')}: ${t('nav.debts')}`}
            filters={[
              {
                label: t('common.status'),
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'active', label: 'Активен' },
                  { value: 'pending', label: 'Ожидает' },
                  { value: 'overdue', label: 'Просрочен' },
                  { value: 'paid', label: 'Оплачен' },
                ],
              },
              {
                label: 'Папка',
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'personal', label: 'Личные' },
                  { value: 'work', label: 'Работа' },
                  { value: 'family', label: 'Семья' },
                  { value: 'partners', label: 'Партнёры' },
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
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="overdue">Просроченные</TabsTrigger>
                <TabsTrigger value="paid">Оплаченные</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[12%]">ID</TableHead>
                    <TableHead className="w-[24%]">Должник</TableHead>
                    <TableHead className="w-[16%]">Папка</TableHead>
                    <TableHead className="w-[16%]">Сумма</TableHead>
                    <TableHead className="w-[14%]">Срок</TableHead>
                    <TableHead className="w-[18%] text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {debts.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">{row.id}</TableCell>
                      <TableCell className="font-medium whitespace-nowrap">
                        {row.debtor}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{row.folder}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.amount}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`${t('common.edit')} ${row.id}`}
                            onClick={() => setDialogMode('edit')}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            disabled
                            aria-label={`В архив ${row.id}`}
                            title="Действие появится после backend"
                          >
                            <Archive />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {['active', 'overdue', 'paid'].map((tab) => (
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
          dialogMode === 'edit' ? 'Редактирование долга' : 'Добавление долга'
        }
        description="Форма подготовлена как визуальный каркас. Состав полей уточняется после изучения backend."
      />
    </div>
  )
}
