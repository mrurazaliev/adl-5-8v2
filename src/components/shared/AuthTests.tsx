import { useAppSelector } from '@/app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetMeQuery } from '@/features/auth/userApi'

export default function AuthTest() {
  const { t } = useTranslation()
  const token = useAppSelector((state) => state.auth.accessToken)

  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  })

  if (!token) {
    return <p>{t('auth.unauthenticated')}</p>
  }

  if (isLoading) {
    return <p>{t('auth.userLoading')}</p>
  }

  if (isError) {
    return <p>{t('auth.userError')}</p>
  }

  return <p>{t('auth.welcome', { name: data?.name ?? '' })}</p>
}
