import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      appTitle: 'ADL58 V2',
      subtitle: 'Управление финансами',
      toggleTheme: 'Переключить тему',
      language: 'Язык интерфейса',
      navigation: 'Навигация',
      demoMode: 'Демо-интерфейс без подключения к backend',
      nav: {
        dashboard: 'Дашборд',
        debts: 'Долги',
        contacts: 'Контакты',
        folders: 'Папки',
        payments: 'Платежи',
        users: 'Пользователи',
        archive: 'Архив',
      },
      common: {
        search: 'Поиск',
        filters: 'Фильтры',
        add: 'Добавить',
        manage: 'Управлять',
        view: 'Просмотр',
        restore: 'Восстановить',
        edit: 'Редактировать',
        demo: 'Демо',
        all: 'Все',
        status: 'Статус',
      },
      pages: {
        dashboard: {
          title: 'Дашборд',
          subtitle: 'Визуальный обзор финансовых показателей',
          stats: 'Ключевые показатели',
          trend: 'Финансовая статистика',
          structure: 'Структура платежей',
          recent: 'Последние платежи',
          quick: 'Быстрые действия',
          owedToMe: 'Мне должны',
          iOwe: 'Я должен',
          createDebt: 'Создать долг',
          openDebtMenu: 'Открыть меню создания долга',
          closeDebtMenu: 'Закрыть меню создания долга',
          owedToMeDescription:
            'Демонстрационная форма долга: мне должны. Сохранение появится после подключения backend.',
          iOweDescription:
            'Демонстрационная форма долга: я должен. Сохранение появится после подключения backend.',
        },
        debts: {
          title: 'Долги',
          subtitle: 'Список долговых записей',
        },
        contacts: {
          title: 'Контакты',
          subtitle: 'Контакты и связи с должниками',
        },
        folders: {
          title: 'Папки',
          subtitle: 'Категории для организации данных',
        },
        payments: {
          title: 'Платежи',
          subtitle: 'История и статус платежных операций',
        },
        users: {
          title: 'Пользователи',
          subtitle: 'Участники системы и их роли',
        },
        archive: {
          title: 'Архив',
          subtitle: 'Архивные записи и действия с ними',
        },
      },
    },
  },
  tj: {
    translation: {
      appTitle: 'ADL58 V2',
      subtitle: 'Идоракунии молия',
      toggleTheme: 'Тағйир додани мавзӯъ',
      language: 'Забони интерфейс',
      navigation: 'Навбарӣ',
      demoMode: 'Интерфейси намоишӣ бе пайвастшавӣ ба backend',
      nav: {
        dashboard: 'Саҳифаи асосӣ',
        debts: 'Қарзҳо',
        contacts: 'Тамосҳо',
        folders: 'Папкаҳо',
        payments: 'Пардохтҳо',
        users: 'Корбарон',
        archive: 'Бойгонӣ',
      },
      common: {
        search: 'Ҷустуҷӯ',
        filters: 'Филтрҳо',
        add: 'Илова',
        manage: 'Идора',
        view: 'Намоиш',
        restore: 'Барқарор',
        edit: 'Таҳрир',
        demo: 'Намоишӣ',
        all: 'Ҳама',
        status: 'Вазъият',
      },
      pages: {
        dashboard: {
          title: 'Саҳифаи асосӣ',
          subtitle: 'Намоиши умумии нишондиҳандаҳои молиявӣ',
          stats: 'Нишондиҳандаҳои асосӣ',
          trend: 'Омори молиявӣ',
          structure: 'Сохтори пардохтҳо',
          recent: 'Пардохтҳои охирин',
          quick: 'Амалҳои зуд',
          owedToMe: 'Ба ман қарздор',
          iOwe: 'Ман қарздор',
          createDebt: 'Эҷоди қарз',
          openDebtMenu: 'Кушодани менюи эҷоди қарз',
          closeDebtMenu: 'Пӯшидани менюи эҷоди қарз',
          owedToMeDescription:
            'Шакли намоишии қарз: ба ман қарздор. Сабт пас аз пайвастшавӣ ба backend дастрас мешавад.',
          iOweDescription:
            'Шакли намоишии қарз: ман қарздор. Сабт пас аз пайвастшавӣ ба backend дастрас мешавад.',
        },
        debts: {
          title: 'Қарзҳо',
          subtitle: 'Рӯйхати сабтҳои қарз',
        },
        contacts: {
          title: 'Тамосҳо',
          subtitle: 'Тамосҳо ва робита бо қарздорон',
        },
        folders: {
          title: 'Папкаҳо',
          subtitle: 'Категорияҳо барои ташкили маълумот',
        },
        payments: {
          title: 'Пардохтҳо',
          subtitle: 'Таърих ва вазъи амалиётҳои пардохт',
        },
        users: {
          title: 'Корбарон',
          subtitle: 'Иштирокчиён ва нақшҳои онҳо',
        },
        archive: {
          title: 'Бойгонӣ',
          subtitle: 'Сабтҳои бойгонӣ ва амалҳо бо онҳо',
        },
      },
    },
  },
  en: {
    translation: {
      appTitle: 'ADL58 V2',
      subtitle: 'Financial management',
      toggleTheme: 'Toggle theme',
      language: 'Interface language',
      navigation: 'Navigation',
      demoMode: 'Demo interface with no backend connection',
      nav: {
        dashboard: 'Dashboard',
        debts: 'Debts',
        contacts: 'Contacts',
        folders: 'Folders',
        payments: 'Payments',
        users: 'Users',
        archive: 'Archive',
      },
      common: {
        search: 'Search',
        filters: 'Filters',
        add: 'Add',
        manage: 'Manage',
        view: 'View',
        restore: 'Restore',
        edit: 'Edit',
        demo: 'Demo',
        all: 'All',
        status: 'Status',
      },
      pages: {
        dashboard: {
          title: 'Dashboard',
          subtitle: 'Visual overview of financial metrics',
          stats: 'Key metrics',
          trend: 'Financial statistics',
          structure: 'Payment structure',
          recent: 'Recent payments',
          quick: 'Quick actions',
          owedToMe: 'Owed to me',
          iOwe: 'I owe',
          createDebt: 'Create debt',
          openDebtMenu: 'Open debt creation menu',
          closeDebtMenu: 'Close debt creation menu',
          owedToMeDescription:
            'Demo debt form: owed to me. Saving will be available after backend integration.',
          iOweDescription:
            'Demo debt form: I owe. Saving will be available after backend integration.',
        },
        debts: {
          title: 'Debts',
          subtitle: 'Debt records overview',
        },
        contacts: {
          title: 'Contacts',
          subtitle: 'Contacts and debtor relationships',
        },
        folders: {
          title: 'Folders',
          subtitle: 'Categories for organizing data',
        },
        payments: {
          title: 'Payments',
          subtitle: 'Payment history and status',
        },
        users: {
          title: 'Users',
          subtitle: 'System participants and their roles',
        },
        archive: {
          title: 'Archive',
          subtitle: 'Archived records and available actions',
        },
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  supportedLngs: ['ru', 'tj', 'en'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
