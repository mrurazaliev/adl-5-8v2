import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pencil, Plus, ShieldCheck } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { FilterBar } from '@/components/shared/FilterBar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { users } from '@/mocks/mockData'

type DialogMode = 'add' | 'edit' | null

export default function UsersPage() {
  const { t } = useTranslation()
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.users.title')}
        description={t('pages.users.subtitle')}
        actions={
          <Button type="button" onClick={() => setDialogMode('add')}>
            <Plus />
            {t('common.add')}
          </Button>
        }
      />

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>{t('pages.users.title')}</CardTitle>
          <CardDescription>
            Роли и статусы показаны на демонстрационных данных
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FilterBar
            searchPlaceholder={`${t('common.search')}: ${t('nav.users')}`}
            filters={[
              {
                label: 'Роль',
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'admin', label: 'Администратор' },
                  { value: 'manager', label: 'Менеджер' },
                  { value: 'viewer', label: 'Наблюдатель' },
                ],
              },
              {
                label: t('common.status'),
                options: [
                  { value: 'all', label: t('common.all') },
                  { value: 'active', label: 'Активен' },
                  { value: 'new', label: 'Новый' },
                  { value: 'archived', label: 'В архиве' },
                ],
              },
            ]}
            actionLabel={t('common.add')}
            onAction={() => setDialogMode('add')}
          />

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Последняя активность</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-xs">{row.id}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {row.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{row.email}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {row.lastActive}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="whitespace-nowrap">
                        <ShieldCheck className="size-3" />
                        {row.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
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
          </div>
        </CardContent>
      </Card>

      <DemoActionDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMode(null)
        }}
        title={
          dialogMode === 'edit' ? 'Редактирование пользователя' : 'Добавление пользователя'
        }
        description="Форма подготовлена как визуальный каркас. Состав полей уточняется после изучения backend."
      />
    </div>
  )
}
