import React from "react";
import { AppProps } from "next/app";
import { AppHeader } from "../src/Components/AppHeader/AppHeader";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/config/theme";

import { IntlProvider } from "react-intl";
import { messages } from "../src/constants/messages";
import { useIntl } from "../src/constants/intl/intlHooks";

/**
 * With this file, we can customize the React entry point for every page of our website
 * Here we can add components that appear on every screen, or even hold state that all pages will use
 * read more: https://nextjs.org/docs/advanced-features/custom-app
 */

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [translatedMessage, language] = useIntl();

  return (
    <IntlProvider locale={language} defaultLocale={"en"} messages={messages}>
      <ThemeProvider theme={theme}>
        <AppHeader />
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
