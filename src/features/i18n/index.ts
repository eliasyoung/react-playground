import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, defaultNS } from "./resources";

export const supportLanguages = [
  { key: "en", label: "English" },
  { key: "zh", label: "简体中文" },
] as const;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: Object.keys(resources.en) as Array<keyof typeof resources.en>,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    defaultNS,
  });

export default i18n;
