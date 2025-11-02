import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import mnTranslations from './locales/mn.json'
import koTranslations from './locales/ko.json'
import enTranslations from './locales/en.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      mn: { translation: mnTranslations },
      ko: { translation: koTranslations },
      en: { translation: enTranslations },
    },
    lng: localStorage.getItem('language') || 'ko',
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

