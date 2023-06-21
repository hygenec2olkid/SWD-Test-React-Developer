import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import frTranslation from "./locales/th.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  th: {
    translation: frTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Set the default language
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes variables
  },
});

export default i18n;
