import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import detectBrowserLanguage from "detect-browser-language";

export const useIntl = () => {
  const [language] = useState<string>(() => {
    let browserLanguage = "en";
    // the following 'if' is an workaround to avoid the 'navigator not defined' error
    // useEffect could also be used, but it would create aditional renders
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
