import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Pencil, Phone, Plus } from 'lucide-react'
import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { FilterBar } from '@/components/shared/FilterBar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { contacts } from '@/mocks/mockData'

type DialogMode = 'add' | 'edit' | null

export default function ContactsPage() {
  const { t } = useTranslation()
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.contacts.title')}
        description={t('pages.contacts.subtitle')}
        actions={
          <Button type="button" onClick={() => setDialogMode('add')}>
            <Plus />
            {t('common.add')}
          </Button>
        }
      />

      <FilterBar
        searchPlaceholder={`${t('common.search')}: ${t('nav.contacts')}`}
        filters={[
          {
            label: t('common.status'),
            options: [
              { value: 'all', label: t('common.all') },
              { value: 'active', label: 'Активен' },
              { value: 'overdue', label: 'Просрочен' },
              { value: 'archived', label: 'В архиве' },
            ],
          },
          {
            label: 'Долги',
            options: [
              { value: 'all', label: t('common.all') },
              { value: 'with', label: 'С долгами' },
              { value: 'without', label: 'Без долгов' },
            ],
          },
        ]}
        actionLabel={t('common.add')}
        onAction={() => setDialogMode('add')}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="border-border/70 shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-start gap-3">
              <Avatar className="size-11">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-base">
                  {contact.name}
                </CardTitle>
                <CardDescription className="font-mono text-xs">
                  {contact.id}
                </CardDescription>
              </div>
              <StatusBadge status={contact.status} />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  {contact.phone}
                </p>
                <p className="flex items-center gap-2 truncate text-muted-foreground">
                  <Mail className="size-4" />
                  {contact.email}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-border/70 pt-3">
                <span className="text-xs text-muted-foreground">
                  Долгов: {contact.debts}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setDialogMode('edit')}
                >
                  <Pencil />
                  {t('common.edit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DemoActionDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMode(null)
        }}
        title={
          dialogMode === 'edit' ? 'Редактирование контакта' : 'Добавление контакта'
        }
        description="Форма подготовлена как визуальный каркас. Состав полей уточняется после изучения backend."
      />
    </div>
  )
}
