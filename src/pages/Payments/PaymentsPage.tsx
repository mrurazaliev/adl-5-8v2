import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function PaymentsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <PageHeader title={t('pages.payments.title')} description={t('pages.payments.subtitle')} />
      <Card className="border-border/70 shadow-sm">
        <CardContent className="space-y-4 py-8">
          <p className="text-sm text-muted-foreground">{t('pages.payments.selectDebtHint')}</p>
          <Button asChild><Link to="/debts">{t('pages.payments.chooseDebt')}<ArrowRight /></Link></Button>
        </CardContent>
      </Card>
    </div>
  )
}
