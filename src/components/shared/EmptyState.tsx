import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-[16px] border border-dashed border-border bg-card/40 px-5 py-10 text-center sm:px-10">
      <span className="grid size-12 place-items-center rounded-2xl border border-primary/15 bg-primary/10 text-primary-light">
        <Inbox className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-bold">{title}</p>
        <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button type="button" variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
