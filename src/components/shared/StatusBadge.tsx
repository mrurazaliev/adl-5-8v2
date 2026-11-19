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
  pending: 'warning',
  overdue: 'danger',
  paid: 'success',
  completed: 'success',
  archived: 'secondary',
  new: 'secondary',
}

const toneClasses: Record<StatusTone, string> = {
  primary: 'bg-primary/10 text-primary dark:bg-primary/20',
  success: 'bg-success/10 text-success dark:bg-success/20',
  warning: 'bg-warning/15 text-warning dark:bg-warning/20',
  danger: 'bg-danger/10 text-danger dark:bg-danger/20',
  secondary: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
}

export function StatusBadge({ status, tone }: StatusBadgeProps) {
  const resolvedTone = tone ?? tones[status] ?? 'secondary'

  return (
    <Badge
      variant="outline"
      className={cn('border-transparent', toneClasses[resolvedTone])}
    >
      {labels[status] ?? status}
    </Badge>
  )
}
