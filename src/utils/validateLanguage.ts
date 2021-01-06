export const defaultLanguage = 'pt'

// Available languages
export const languages = ['en', 'pt']

// Check if current language is supported and use backup language if don't
export const validateLanguage = (language?: string) => {
  if (!language) return defaultLanguage
  return languages.includes(language) ? language : defaultLanguage
}

export const getLanguage = (lang?: string) => {
  let language = lang?.match(/[a-zA-Z-]{2,10}/g)?.[0]
  language = language?.split('-')[0]

  return validateLanguage(language)
}

export const getUserLanguage = (req: any) => {
  const language: string = req ? req.headers['accept-language'] : window.navigator.language

  return language
}
