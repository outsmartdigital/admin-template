export const backupLanguage = "pt";

// Available languages
export const languages = ["en", "pt"];

// Check if current language is supported and use backup language if don't
export const validateLanguage = (language: string) => {
  return languages.includes(language) ? language : backupLanguage;
};

export const getLanguage = (lang: string) => {
  let language = lang.match(/[a-zA-Z\-]{2,10}/g)[0];
  language = language.split("-")[0];

  return validateLanguage(language);
};

export const getUserLanguage = (req: object) => {
  const language: string = req
    ? req.headers["accept-language"]
    : window.navigator.language;

  return language;
};
