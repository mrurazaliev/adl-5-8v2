import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      appTitle: 'ADL58 V2',
      subtitle: 'Управление финансами',
      toggleTheme: 'Переключить тему',
    },
  },
  tj: {
    translation: {
      appTitle: 'ADL58 V2',
      subtitle: 'Идоракунии молия',
      toggleTheme: 'Тағйир додани мавзӯъ',
    },
  },
  en: {
    translation: {
      appTitle: 'ADL58 V2',
      subtitle: 'Financial management',
      toggleTheme: 'Toggle theme',
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
