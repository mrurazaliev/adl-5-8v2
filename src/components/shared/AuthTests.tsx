import { useAppSelector } from '@/app/hooks'
import { useGetMeQuery } from '@/features/auth/userApi'

export default function AuthTest() {
  const token = useAppSelector((state) => state.auth.accessToken)

  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  })

  if (!token) {
    return <p>Пользователь не авторизован</p>
  }

  if (isLoading) {
    return <p>Загрузка пользователя...</p>
  }

  if (isError) {
    return <p>Ошибка получения пользователя</p>
  }

  return <p>Добро пожаловать, {data?.name}!</p>
}