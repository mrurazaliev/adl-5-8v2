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
}

const defaultFields = ['Параметр 01', 'Параметр 02', 'Параметр 03']

export function DemoActionDialog({
  open,
  onOpenChange,
  title,
  description,
  fields = defaultFields,
}: DemoActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <FieldGroup>
          {fields.map((label, index) => (
            <Field key={label}>
              <FieldLabel htmlFor={`demo-field-${index}`}>{label}</FieldLabel>
              <Input
                id={`demo-field-${index}`}
                placeholder="Не заполняется в демо"
                disabled
              />
            </Field>
          ))}
          <FieldDescription>
            Состав полей и правила сохранения будут определены после подключения
            backend.
          </FieldDescription>
        </FieldGroup>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button type="button" disabled>
            Сохранение недоступно
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
