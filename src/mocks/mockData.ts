export type StatusTone = 'primary' | 'success' | 'warning' | 'danger' | 'secondary'

export type StatIcon = 'wallet' | 'clock' | 'check' | 'alert'

export interface StatItem {
  id: string
  label: string
  value: string
  note: string
  icon: StatIcon
  tone: StatusTone
}

export interface TrendPoint {
  month: string
  planned: number
  actual: number
}

export interface DistributionItem {
  name: string
  value: number
  color: string
}

export interface TransactionRow {
  id: string
  counterparty: string
  category: string
  date: string
  amount: string
  status: string
}

export interface DebtRow {
  id: string
  debtor: string
  folder: string
  amount: string
  dueDate: string
  status: string
}

export interface ContactRow {
  id: string
  name: string
  phone: string
  email: string
  debts: string
  status: string
}

export interface FolderRow {
  id: string
  name: string
  description: string
  items: string
  color: string
}

export interface PaymentRow {
  id: string
  payer: string
  debt: string
  date: string
  method: string
  amount: string
  status: string
}

export interface UserRow {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastActive: string
}

export interface ArchiveRow {
  id: string
  title: string
  type: string
  archivedAt: string
  reason: string
  status: string
}

export const dashboardStats: StatItem[] = [
  {
    id: 'total-result',
    label: 'Общий итог',
    value: '12 480 000',
    note: 'Демонстрационные данные',
    icon: 'wallet',
    tone: 'primary',
  },
  {
    id: 'owed-to-me',
    label: 'Мне должны',
    value: '8 640 000',
    note: 'Демонстрационные данные',
    icon: 'check',
    tone: 'success',
  },
  {
    id: 'i-owe',
    label: 'Я должен',
    value: '3 840 000',
    note: 'Демонстрационные данные',
    icon: 'alert',
    tone: 'danger',
  },
]

export const debtStats: StatItem[] = [
  {
    id: 'debt-active',
    label: 'Активные',
    value: '4',
    note: 'Демонстрационные данные',
    icon: 'wallet',
    tone: 'primary',
  },
  {
    id: 'debt-pending',
    label: 'Ожидают',
    value: '1',
    note: 'Демонстрационные данные',
    icon: 'clock',
    tone: 'warning',
  },
  {
    id: 'debt-paid',
    label: 'Оплаченные',
    value: '1',
    note: 'Демонстрационные данные',
    icon: 'check',
    tone: 'success',
  },
  {
    id: 'debt-overdue',
    label: 'Просроченные',
    value: '1',
    note: 'Демонстрационные данные',
    icon: 'alert',
    tone: 'danger',
  },
]

export const paymentStats: StatItem[] = [
  {
    id: 'payment-completed',
    label: 'Завершено',
    value: '4',
    note: 'Демонстрационные данные',
    icon: 'check',
    tone: 'success',
  },
  {
    id: 'payment-pending',
    label: 'В обработке',
    value: '1',
    note: 'Демонстрационные данные',
    icon: 'clock',
    tone: 'warning',
  },
  {
    id: 'payment-overdue',
    label: 'Просрочено',
    value: '1',
    note: 'Демонстрационные данные',
    icon: 'alert',
    tone: 'danger',
  },
  {
    id: 'payment-methods',
    label: 'Способы оплаты',
    value: '3',
    note: 'Демонстрационные данные',
    icon: 'wallet',
    tone: 'primary',
  },
]

export const paymentTrend: TrendPoint[] = [
  { month: 'Янв', planned: 420, actual: 380 },
  { month: 'Фев', planned: 460, actual: 430 },
  { month: 'Мар', planned: 390, actual: 410 },
  { month: 'Апр', planned: 520, actual: 480 },
  { month: 'Май', planned: 480, actual: 510 },
  { month: 'Июн', planned: 560, actual: 540 },
  { month: 'Июл', planned: 610, actual: 590 },
]

export const paymentDistribution: DistributionItem[] = [
  { name: 'Переводы', value: 46, color: 'var(--chart-1)' },
  { name: 'Наличные', value: 28, color: 'var(--chart-2)' },
  { name: 'Карта', value: 18, color: 'var(--chart-3)' },
  { name: 'Другое', value: 8, color: 'var(--chart-4)' },
]

export const recentTransactions: TransactionRow[] = [
  {
    id: 'OP-2048',
    counterparty: 'Алина Рахимова',
    category: 'Платёж по долгу',
    date: '18.11.2026',
    amount: '125 000',
    status: 'completed',
  },
  {
    id: 'OP-2047',
    counterparty: 'Мансур Ким',
    category: 'Частичный платёж',
    date: '17.11.2026',
    amount: '48 000',
    status: 'pending',
  },
  {
    id: 'OP-2046',
    counterparty: 'Дилшод Назаров',
    category: 'Платёж по долгу',
    date: '15.11.2026',
    amount: '310 000',
    status: 'completed',
  },
  {
    id: 'OP-2045',
    counterparty: 'Екатерина Ли',
    category: 'Просроченный платёж',
    date: '12.11.2026',
    amount: '72 500',
    status: 'overdue',
  },
  {
    id: 'OP-2044',
    counterparty: 'Рустам Алиев',
    category: 'Платёж по долгу',
    date: '10.11.2026',
    amount: '96 000',
    status: 'completed',
  },
]

export const debts: DebtRow[] = [
  {
    id: 'DL-1001',
    debtor: 'Алина Рахимова',
    folder: 'Личные',
    amount: '1 250 000',
    dueDate: '25.11.2026',
    status: 'active',
  },
  {
    id: 'DL-1002',
    debtor: 'Мансур Ким',
    folder: 'Работа',
    amount: '840 000',
    dueDate: '02.12.2026',
    status: 'pending',
  },
  {
    id: 'DL-1003',
    debtor: 'Дилшод Назаров',
    folder: 'Семья',
    amount: '2 100 000',
    dueDate: '10.12.2026',
    status: 'overdue',
  },
  {
    id: 'DL-1004',
    debtor: 'Екатерина Ли',
    folder: 'Личные',
    amount: '460 000',
    dueDate: '18.12.2026',
    status: 'active',
  },
  {
    id: 'DL-1005',
    debtor: 'Рустам Алиев',
    folder: 'Партнёры',
    amount: '3 400 000',
    dueDate: '27.12.2026',
    status: 'paid',
  },
  {
    id: 'DL-1006',
    debtor: 'Наталья Соколова',
    folder: 'Работа',
    amount: '720 000',
    dueDate: '05.01.2027',
    status: 'active',
  },
]

export const contacts: ContactRow[] = [
  {
    id: 'CT-301',
    name: 'Алина Рахимова',
    phone: '+992 90 123 45 67',
    email: 'alina@example.com',
    debts: '2',
    status: 'active',
  },
  {
    id: 'CT-302',
    name: 'Мансур Ким',
    phone: '+992 91 234 56 78',
    email: 'mansur@example.com',
    debts: '1',
    status: 'active',
  },
  {
    id: 'CT-303',
    name: 'Дилшод Назаров',
    phone: '+992 92 345 67 89',
    email: 'dilshod@example.com',
    debts: '3',
    status: 'overdue',
  },
  {
    id: 'CT-304',
    name: 'Екатерина Ли',
    phone: '+992 93 456 78 90',
    email: 'ekaterina@example.com',
    debts: '1',
    status: 'active',
  },
  {
    id: 'CT-305',
    name: 'Рустам Алиев',
    phone: '+992 94 567 89 01',
    email: 'rustam@example.com',
    debts: '0',
    status: 'archived',
  },
  {
    id: 'CT-306',
    name: 'Наталья Соколова',
    phone: '+992 95 678 90 12',
    email: 'natalya@example.com',
    debts: '2',
    status: 'active',
  },
]

export const folders: FolderRow[] = [
  {
    id: 'FL-01',
    name: 'Личные',
    description: 'Долги и контакты личного круга',
    items: '12',
    color: 'var(--chart-1)',
  },
  {
    id: 'FL-02',
    name: 'Работа',
    description: 'Коллеги и рабочие операции',
    items: '8',
    color: 'var(--chart-2)',
  },
  {
    id: 'FL-03',
    name: 'Семья',
    description: 'Семейные обязательства',
    items: '5',
    color: 'var(--chart-3)',
  },
  {
    id: 'FL-04',
    name: 'Партнёры',
    description: 'Партнёрские расчёты',
    items: '4',
    color: 'var(--chart-4)',
  },
  {
    id: 'FL-05',
    name: 'Аренда',
    description: 'Арендные платежи',
    items: '3',
    color: 'var(--chart-5)',
  },
  {
    id: 'FL-06',
    name: 'Проекты',
    description: 'Временные проектные группы',
    items: '7',
    color: 'var(--chart-2)',
  },
]

export const payments: PaymentRow[] = [
  {
    id: 'PL-9001',
    payer: 'Алина Рахимова',
    debt: 'DL-1001',
    date: '18.11.2026',
    method: 'Перевод',
    amount: '125 000',
    status: 'completed',
  },
  {
    id: 'PL-9002',
    payer: 'Мансур Ким',
    debt: 'DL-1002',
    date: '17.11.2026',
    method: 'Карта',
    amount: '48 000',
    status: 'pending',
  },
  {
    id: 'PL-9003',
    payer: 'Дилшод Назаров',
    debt: 'DL-1003',
    date: '15.11.2026',
    method: 'Наличные',
    amount: '310 000',
    status: 'completed',
  },
  {
    id: 'PL-9004',
    payer: 'Екатерина Ли',
    debt: 'DL-1004',
    date: '12.11.2026',
    method: 'Перевод',
    amount: '72 500',
    status: 'overdue',
  },
  {
    id: 'PL-9005',
    payer: 'Рустам Алиев',
    debt: 'DL-1005',
    date: '10.11.2026',
    method: 'Карта',
    amount: '96 000',
    status: 'completed',
  },
  {
    id: 'PL-9006',
    payer: 'Наталья Соколова',
    debt: 'DL-1006',
    date: '08.11.2026',
    method: 'Перевод',
    amount: '54 000',
    status: 'completed',
  },
]

export const users: UserRow[] = [
  {
    id: 'US-01',
    name: 'Администратор',
    email: 'admin@example.com',
    role: 'Администратор',
    status: 'active',
    lastActive: 'Сегодня',
  },
  {
    id: 'US-02',
    name: 'Марина Иванова',
    email: 'marina@example.com',
    role: 'Менеджер',
    status: 'active',
    lastActive: 'Сегодня',
  },
  {
    id: 'US-03',
    name: 'Сергей Петров',
    email: 'sergey@example.com',
    role: 'Менеджер',
    status: 'pending',
    lastActive: 'Вчера',
  },
  {
    id: 'US-04',
    name: 'Ольга Смирнова',
    email: 'olga@example.com',
    role: 'Наблюдатель',
    status: 'active',
    lastActive: '3 дня назад',
  },
  {
    id: 'US-05',
    name: 'Тимур Ганеев',
    email: 'timur@example.com',
    role: 'Менеджер',
    status: 'archived',
    lastActive: 'Месяц назад',
  },
  {
    id: 'US-06',
    name: 'Лариса Ким',
    email: 'larisa@example.com',
    role: 'Наблюдатель',
    status: 'active',
    lastActive: 'Неделю назад',
  },
]

export const archive: ArchiveRow[] = [
  {
    id: 'AR-5501',
    title: 'Долг DL-0998',
    type: 'Долг',
    archivedAt: '02.11.2026',
    reason: 'Закрыт',
    status: 'archived',
  },
  {
    id: 'AR-5502',
    title: 'Контакт CT-288',
    type: 'Контакт',
    archivedAt: '28.10.2026',
    reason: 'Не актуален',
    status: 'archived',
  },
  {
    id: 'AR-5503',
    title: 'Папка «Старые проекты»',
    type: 'Папка',
    archivedAt: '21.10.2026',
    reason: 'Завершён проект',
    status: 'archived',
  },
  {
    id: 'AR-5504',
    title: 'Платёж PL-8102',
    type: 'Платёж',
    archivedAt: '14.10.2026',
    reason: 'Дубликат',
    status: 'archived',
  },
  {
    id: 'AR-5505',
    title: 'Пользователь US-18',
    type: 'Пользователь',
    archivedAt: '09.10.2026',
    reason: 'Деактивирован',
    status: 'archived',
  },
  {
    id: 'AR-5506',
    title: 'Долг DL-0971',
    type: 'Долг',
    archivedAt: '01.10.2026',
    reason: 'Закрыт',
    status: 'archived',
  },
]
