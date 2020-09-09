import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import detectBrowserLanguage from "detect-browser-language";

export const useIntl = () => {
  const [language] = useState<string>(() => {
    let browserLanguage = "en";
    if (typeof window !== "undefined") {
      browserLanguage = detectBrowserLanguage();
    }
    const languageWithoutRegion: string = browserLanguage.split(/[-_]/)[0];
    return languageWithoutRegion;
  });

  const translatedMessage = (message: string) => {
    return <FormattedMessage id={message} />;
  };

  return [translatedMessage, language];
};
