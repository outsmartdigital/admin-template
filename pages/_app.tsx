import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { AppHeader } from "../src/Components/AppHeader/AppHeader";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/config/theme";
import { useLanguages } from "./hooks";

import { IntlProvider } from "react-intl";
import { messages } from "../src/constants/messages";

/**
 * With this file, we can customize the React entry point for every page of our website
 * Here we can add components that appear on every screen, or even hold state that all pages will use
 * read more: https://nextjs.org/docs/advanced-features/custom-app
 */

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [language] = useLanguages();

  const intlLocale: string = language;

  return (
    <IntlProvider
      locale={intlLocale}
      defaultLocale={"en"}
      messages={messages[language]}
    >
      <ThemeProvider theme={theme}>
        <AppHeader />
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
