import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface DemoActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  fields?: string[]
  saveLabel?: string
  children?: ReactNode
}

export function DemoActionDialog({
  open,
  onOpenChange,
  title,
  description,
  fields,
  saveLabel,
  children,
}: DemoActionDialogProps) {
  const { t } = useTranslation()
  const labels = fields ?? [1, 2, 3].map((number) => t('common.demoField', { number }))
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <FieldGroup>
          {children ?? (
            <>
              {labels.map((label, index) => (
                <Field key={label}>
                  <FieldLabel htmlFor={`demo-field-${index}`}>{label}</FieldLabel>
                  <Input
                    id={`demo-field-${index}`}
                    placeholder={t('common.demoPlaceholder')}
                    disabled
                  />
                </Field>
              ))}
              <FieldDescription>
                {t('common.demoDescription')}
              </FieldDescription>
            </>
          )}
        </FieldGroup>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t('common.cancel')}
          </Button>
          <Button type="button" disabled>
            {saveLabel ?? t('common.saveUnavailable')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
