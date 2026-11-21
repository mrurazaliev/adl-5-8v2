import { Plus, Search, SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterOption {
  value: string
  label: string
}

interface FilterDefinition {
  label: string
  options: FilterOption[]
}

interface FilterBarProps {
  searchPlaceholder: string
  filters: FilterDefinition[]
  actionLabel?: string
  onAction?: () => void
}

export function FilterBar({
  searchPlaceholder,
  filters,
  actionLabel,
  onAction,
}: FilterBarProps) {
  const { t } = useTranslation()
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-sm lg:flex-row lg:items-center">
      <div className="relative w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      <div className="flex flex-1 flex-wrap gap-2">
        {filters.map((filter) => (
          <Select
            key={filter.label}
            defaultValue={filter.options[0]?.value}
          >
            <SelectTrigger
              aria-label={filter.label}
              className="w-full sm:w-[150px]"
            >
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled
          title={t('common.filtersUnavailable')}
        >
          <SlidersHorizontal />
          {t('common.filters')}
        </Button>
        {actionLabel && onAction ? (
          <Button type="button" size="sm" onClick={onAction}>
            <Plus />
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
