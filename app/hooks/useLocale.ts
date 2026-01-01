import { useState } from "react";
import { getI18n, languages } from "../i18n";

export default function useLocale() {
  let locale = Intl.DateTimeFormat().resolvedOptions().locale;

  if (!languages[locale]) {
    locale = "en";
  }

  const [language, setLanguage] = useState(locale);

  return {
    getI18n: (key: string) => getI18n(key, language),
    setLocale: setLanguage,
    locale: language
  };
}
