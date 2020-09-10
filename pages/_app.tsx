import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { AppHeader } from "../src/Components/AppHeader/AppHeader";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/config/theme";

import { IntlProvider } from "react-intl";
import { messages } from "../src/constants/messages";

/**
 * With this file, we can customize the React entry point for every page of our website
 * Here we can add components that appear on every screen, or even hold state that all pages will use
 * read more: https://nextjs.org/docs/advanced-features/custom-app
 */

class CustomApp extends App<
  AppProps & { GlobalStateProvider: React.ComponentType }
> {
  static async getInitialProps({ ctx, Component }: AppContext) {
    let pageProps = {};

    const { req } = ctx;
    const language = req
      ? req.headers["accept-language"]
      : window.navigator.language;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      language
    };
  }

  render() {
    const { Component, pageProps, language } = this.props;
    const formatedLanguage = language.split(/[-_]/)[0];

    return (
      <IntlProvider
        locale={formatedLanguage}
        defaultLocale={"pt"}
        messages={messages}
      >
        <ThemeProvider theme={theme}>
          <AppHeader />
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default CustomApp;
