import { useState, useEffect } from "react";
import detectBrowserLanguage from "detect-browser-language";

export const useLanguages = () => {
  const [language, setLanguage] = useState<string>();

  useEffect(() => {
    const browserLanguage: string = detectBrowserLanguage();
    const languageWithoutRegion: string = browserLanguage.split(/[-_]/)[0];
    setLanguage(languageWithoutRegion);

    console.log("LANGUAGE É:", languageWithoutRegion);
  }, []);

  return [language];
};
