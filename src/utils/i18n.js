import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      'address': 'Address',
      'transit': 'Nearest Station',
      'birth': 'DOB', 
      'identity': 'Identity',
      'nationality': 'Nationality',
      'visa': 'Visa', 
      'validity': 'Validity',
      'experience': "Experienced Years", 
      'intro': "Personal Introduction",
    }
  }, 
  jp: {
    translation: {
      'address': '住所', 
      'transit': '最寄駅',
      'birth': '生年月日', 
      'identity': '身分',
      'nationality': '国籍',
      'visa': '在留資格', 
      'validity': '有効期限',
      'experience': "経験年数", 
      'intro': "個人紹介",
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

export function GetLanguage() {
  return i18n.language ||
    (typeof window !== 'undefined' && window.localStorage.i18nextLng) ||
    'en';
};