import { RefreshCw } from 'lucide-react'

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
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMeQuery } from '@/features/auth/userApi'

export default function ProfilePage() {
  const { data: user, isLoading, isError, refetch } = useGetMeQuery()

  const createdAt = user?.created_at ? new Date(user.created_at) : null
  const registrationDate =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString('ru-RU')
      : null

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Мой профиль"
          description="Информация о вашей учётной записи"
        />

        <Card className="max-w-3xl border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="size-14 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="space-y-2 rounded-xl border border-border/70 p-4"
              >
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Мой профиль"
          description="Информация о вашей учётной записи"
        />

        <Card className="max-w-3xl border-destructive/30">
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <p className="text-sm text-destructive">
              Не удалось загрузить данные профиля.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
            >
              <RefreshCw className="size-4" />
              Попробовать снова
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Мой профиль"
        description="Информация о вашей учётной записи"
      />

      <Card className="max-w-3xl border-border/70 shadow-sm">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="size-14">
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              {user?.name?.charAt(0).toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <CardTitle className="truncate text-xl">
              {user?.name ?? 'Пользователь'}
            </CardTitle>

            <CardDescription className="truncate">
              {user?.email ?? 'Email недоступен'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <h2 className="text-sm font-semibold">
            Информация об аккаунте
          </h2>

          {user ? (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                <dt className="text-xs text-muted-foreground">
                  Имя
                </dt>

                <dd className="mt-1 truncate text-sm font-medium">
                  {user.name}
                </dd>
              </div>

              <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                <dt className="text-xs text-muted-foreground">
                  Email
                </dt>

                <dd className="mt-1 truncate text-sm font-medium">
                  {user.email}
                </dd>
              </div>

              {registrationDate && (
                <div className="rounded-xl border border-border/70 bg-background/40 p-4">
                  <dt className="text-xs text-muted-foreground">
                    Дата регистрации
                  </dt>

                  <dd className="mt-1 text-sm font-medium">
                    {registrationDate}
                  </dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">
              Данные пользователя недоступны.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
