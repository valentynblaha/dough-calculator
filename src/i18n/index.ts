import gbFlag from "../assets/gb.svg";
import itFlag from "../assets/it.svg";
import { LANG_EN } from "./en";
import { LANG_IT } from "./it";

type Language = {
    label: string,
    flag: string,
    dictionary: Record<string, string> | null
}

export const languages: Record<string, Language> = {
    "en": {
        label: "English",
        flag: gbFlag,
        dictionary: LANG_EN
    },
    "it": {
        label: "Italiano",
        flag: itFlag,
        dictionary: LANG_IT
    },
}


export function getI18n(key: string, language: string) {
    return languages[language]?.dictionary?.[key] ?? key;
}