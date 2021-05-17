import translationVI from "../locales/vi/translation.json";
import translationEN from "../locales/en/translation.json";

export const getTranslation = () =>
  localStorage.getItem("i18nextLng") === "en"
    ? translationEN
    : localStorage.getItem("i18nextLng") === "vi"
    ? translationVI
    : {};
