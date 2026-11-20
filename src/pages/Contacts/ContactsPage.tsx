import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Pencil, Phone, Plus, RefreshCw } from 'lucide-react'

import { useGetContactsQuery } from '@/features/contacts/contactsApi'

import { DemoActionDialog } from '@/components/shared/DemoActionDialog'
import { PageHeader } from '@/components/shared/PageHeader'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type DialogMode = 'add' | 'edit' | null

export default function ContactsPage() {
  const { t } = useTranslation()

  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [search, setSearch] = useState('')

  const {
    data: contacts = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetContactsQuery()

  const filteredContacts = contacts.filter((contact) => {
    const query = search.trim().toLowerCase()

    return (
      contact.name.toLowerCase().includes(query) ||
      (contact.email ?? '').toLowerCase().includes(query) ||
      (contact.phone ?? '').toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pages.contacts.title')}
        description={t('pages.contacts.subtitle')}
        actions={
          <Button
            type="button"
            onClick={() => setDialogMode('add')}
          >
            <Plus className="size-4" />
            {t('common.add')}
          </Button>
        }
      />

      {/* Search */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск контактов..."
          className="h-10 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
          />
          Обновить
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-48 animate-pulse">
              <CardContent className="space-y-4 pt-6">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col items-center gap-3 py-10">
            <p className="text-sm text-destructive">
              Не удалось загрузить контакты.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
            >
              Попробовать снова
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !isError && contacts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <p className="text-lg font-semibold">
              Контактов пока нет
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Добавьте первый контакт, чтобы начать работу.
            </p>

            <Button
              type="button"
              onClick={() => setDialogMode('add')}
            >
              <Plus className="size-4" />
              Добавить контакт
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Search Results */}
      {!isLoading &&
        !isError &&
        contacts.length > 0 &&
        filteredContacts.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-sm text-muted-foreground">
                По вашему запросу ничего не найдено.
              </p>
            </CardContent>
          </Card>
        )}

      {/* Real Contacts */}
      {!isLoading && !isError && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredContacts.map((contact) => (
            <Card
              key={contact.id}
              className="border-border/70 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start gap-3">
                <Avatar className="size-11">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {contact.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-base">
                    {contact.name}
                  </CardTitle>

                  <CardDescription className="truncate font-mono text-xs">
                    {contact.id}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  {contact.phone && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-4 shrink-0" />
                      <span>{contact.phone}</span>
                    </p>
                  )}

                  {contact.email && (
                    <p className="flex items-center gap-2 truncate text-muted-foreground">
                      <Mail className="size-4 shrink-0" />
                      <span className="truncate">
                        {contact.email}
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end border-t border-border/70 pt-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setDialogMode('edit')}
                  >
                    <Pencil className="size-4" />
                    {t('common.edit')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <DemoActionDialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMode(null)
        }}
        title={
          dialogMode === 'edit'
            ? 'Редактирование контакта'
            : 'Добавление контакта'
        }
        description="Функция добавления и редактирования контактов будет подключена к backend на следующем этапе."
      />
    </div>
  )
}
