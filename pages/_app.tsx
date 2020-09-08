import "reflect-metadata";
import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "styled-components";
import { setGlobal, getGlobal } from "reactn";
import Head from "next/head";

import { AppHeader } from "../src/components/AppHeader/AppHeader";
import { theme } from "../src/config/theme";
import { GlobalStyles } from "../src/components/GlobalStyles/GlobalStyles";
import { withGlobalState } from "../src/utils/hocs/withGlobalState";
import { checkIfServer } from "../src/utils/checkIfServer";
import { Container } from "typedi";
import { uuid } from "../src/utils/uuid";
import { ContainerContext } from "../src/utils/architecture/di/containerContext";
import { setupContainer } from "../src/container";
import { EnhancedNextPageContext } from "../src/utils/architecture/PageComponent";
import { Context } from "../src/utils/architecture/di/contextService";

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

interface CustomAppProps extends AppProps {
  GlobalStateProvider: React.ComponentType;
  containerId: string;
}

/**
 * With this file, we can customize the React entry point for every page of our website
 * Here we can add components that appear on every site, or even hold state that all pages will use
 * read more: https://nextjs.org/docs/advanced-features/custom-app
 */
class CustomApp extends App<CustomAppProps> {
  static async getInitialProps({ ctx, Component }: AppContext) {
    console.log("App Get Initial Props");
    const containerId = uuid();
    const container = Container.of(containerId);
    {
      (ctx as EnhancedNextPageContext).container = container;
    }
    container.set(Context, ctx);
    if (isServer) {
      setupContainer(container);
    }
    ctx.res?.on("finish", () => container.remove(containerId));
    let pageProps = (await Component.getInitialProps?.(ctx)) || {};
    return { pageProps, containerId };
  }

  constructor(props: CustomAppProps) {
    super(props);
    if (!isServer) {
      const container = Container.of(props.containerId);
      if (!container.has(Context)) {
        container.set(Context, { container });
      }
      setupContainer(container);
    }
  }

  render() {
    const {
      Component,
      pageProps,
      GlobalStateProvider,
      containerId
    } = this.props;
    const container = Container.of(containerId);
    const Wrapper = GlobalStateProvider || React.Fragment;
    return (
      <Wrapper>
        <ContainerContext.Provider value={container}>
          <Head>
            <title>Outsmart Digital NextJs Template</title>
          </Head>
          <ThemeProvider theme={theme}>
            <AppHeader />
            <Component {...pageProps} />
          </ThemeProvider>
          <GlobalStyles />
        </ContainerContext.Provider>
      </Wrapper>
    );
  }
}

export default withGlobalState(CustomApp);
