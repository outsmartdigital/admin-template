export const backupLanguage = "pt";

// Linguas disponiveis no site
export const languages = ["en", "pt"];

// Checar se a lingua atual é suportada pelo site
export const validateLanguage = (language: string) => {
  return languages.includes(language) ? language : backupLanguage;
};

export const getLanguage = (lang: string) => {
  let language = lang.match(/[a-zA-Z\-]{2,10}/g)[0];
  language = language.split("-")[0];

  return validateLanguage(language);
};
