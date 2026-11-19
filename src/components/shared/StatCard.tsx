import { AlertCircle, CheckCircle2, Clock3, Wallet, type LucideIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { StatItem, StatusTone } from '@/mocks/mockData'

interface StatCardProps {
  item: StatItem
}

const icons: Record<StatItem['icon'], LucideIcon> = {
  wallet: Wallet,
  clock: Clock3,
  check: CheckCircle2,
  alert: AlertCircle,
}

const toneClasses: Record<StatusTone, string> = {
  primary: 'bg-primary/10 text-primary dark:bg-primary/20',
  success: 'bg-success/10 text-success dark:bg-success/20',
  warning: 'bg-warning/15 text-warning dark:bg-warning/20',
  danger: 'bg-danger/10 text-danger dark:bg-danger/20',
  secondary: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
}

export function StatCard({ item }: StatCardProps) {
  const Icon = icons[item.icon]

  return (
    <Card className="h-full border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <CardDescription className="text-xs font-medium uppercase tracking-wide">
          {item.label}
        </CardDescription>
        <span
          className={cn(
            'grid size-9 shrink-0 place-items-center rounded-xl',
            toneClasses[item.tone],
          )}
        >
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {item.value}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{item.note}</p>
      </CardContent>
    </Card>
  )
}
