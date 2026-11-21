import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { StatusTone } from '@/mocks/mockData'

interface StatusBadgeProps {
  status: string
  tone?: StatusTone
}

const labels: Record<string, string> = {
  active: 'Активен',
  pending: 'Ожидает',
  overdue: 'Просрочен',
  paid: 'Оплачен',
  completed: 'Завершён',
  archived: 'В архиве',
  new: 'Новый',
}

const tones: Record<string, StatusTone> = {
  active: 'primary',
  pending: 'secondary',
  overdue: 'danger',
  paid: 'success',
  completed: 'success',
  archived: 'secondary',
  new: 'secondary',
}

const toneClasses: Record<StatusTone, string> = {
  primary: 'border-primary/30 bg-primary/15 text-primary-light',
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  danger: 'border-danger/30 bg-danger/10 text-danger',
  secondary: 'border-border bg-muted/50 text-muted-foreground',
}

export function StatusBadge({ status, tone }: StatusBadgeProps) {
  const resolvedTone = tone ?? tones[status] ?? 'secondary'

  return (
    <Badge
      variant="outline"
      className={cn(toneClasses[resolvedTone])}
    >
      {labels[status] ?? status}
    </Badge>
  )
}
