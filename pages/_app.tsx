import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "styled-components";
import { setGlobal, getGlobal } from "reactn";

import { AppHeader } from "../src/components/AppHeader/AppHeader";
import { theme } from "../src/config/theme";
import { GlobalStyles } from "../src/components/GlobalStyles/GlobalStyles";
import { withGlobalState } from "../src/utils/hocs/withGlobalState";
import { checkIfServer } from "../src/utils/checkIfServer";
import Head from "next/head";

// Check if we are in server environment
const isServer = checkIfServer();

// If client side, set initial state
if (!isServer) {
  setGlobal((global as any).__INITIAL_GLOBAL_STATE__ || {}).then(() => {
    console.log("Global Hydrated");
    if (process.env.NODE_ENV === "development") {
      (window as any).getGlobal = getGlobal;
    }
  });
}

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
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, GlobalStateProvider } = this.props;
    const Wrapper = GlobalStateProvider || React.Fragment;
    return (
      <Wrapper>
        <Head>
          <title>Outsmart Digital NextJs Template</title>
        </Head>
        <ThemeProvider theme={theme}>
          <AppHeader />
          <Component {...pageProps} />
        </ThemeProvider>
        <GlobalStyles />
      </Wrapper>
    );
  }
}

export default withGlobalState(CustomApp);
