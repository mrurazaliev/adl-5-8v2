import type { Contact, ContactPayload } from '@/features/contacts/contactsApi'
import type { Debt, DebtPayload } from '@/features/debts/debtsApi'
import type { NewDebtFormValues } from '@/features/debts/debtsSchema'

export async function createDebtWithContact(
  data: NewDebtFormValues,
  createContact: (contact: ContactPayload) => Promise<Contact>,
  addDebt: (debt: DebtPayload) => Promise<Debt>,
  onContactCreated: (id: string) => void,
): Promise<Debt> {
  let contactId = data.contact_id
  if (!contactId) {
    const contact = await createContact({ name: data.contact_name })
    contactId = contact.id
    onContactCreated(contactId)
  }
  return addDebt({
    contact_id: contactId,
    direction: data.direction,
    amount: data.amount,
    currency: data.currency,
    description: data.description.trim() || undefined,
    due_date: data.due_date || undefined,
  })
}
