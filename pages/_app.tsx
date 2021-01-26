import React from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { setGlobal, getGlobal } from 'reactn'
import { Container, ContainerInstance } from 'typedi'
import { IntlProvider } from 'react-intl'

import { uuid } from '../src/utils/uuid'
import { AppHeader } from '../src/components/AppHeader/AppHeader'
import { theme } from '../src/config/theme'
import { ContainerContext } from '../src/utils/architecture/di/containerContext'
import { getLanguage, getUserLanguage } from '../src/utils/validateLanguage'
import { messages } from '../src/constants/messages'
import { GlobalStyles } from '../src/components/GlobalStyles/GlobalStyles'
import { withGlobalState } from '../src/utils/hocs/withGlobalState'
import { checkIfServer } from '../src/utils/checkIfServer'
import Head from 'next/head'
import { EnhancedNextPageContext, PageComponent } from '../src/utils/architecture/PageComponent'
import { Context } from '../src/utils/architecture/di/contextService'
import { setupCommonContainer } from '../src/container'
import { Box } from '@material-ui/core'

// Check if we are in server environment
const isServer = checkIfServer()

// If client side, set initial state
if (!isServer) {
  setGlobal((global as any).__INITIAL_GLOBAL_STATE__ || {}).then(() => {
    console.log('Global Hydrated')
    if (process.env.NODE_ENV === 'development') {
      (window as any).getGlobal = getGlobal
    }
  })
}

interface CustomAppProps extends AppProps {
  GlobalStateProvider: React.ComponentType
  containerId: string
  language: string
}

/**
 * With this file, we can customize the React entry point for every page of our website
 * Here we can add components that appear on every screen, or even hold state that all pages will use
 * read more: https://nextjs.org/docs/advanced-features/custom-app
 */
class CustomApp extends App<CustomAppProps> {
  private static containerId: string

  static async getInitialProps({ ctx, Component }: AppContext) {
    const { req } = ctx
    const language = getUserLanguage(req)
    const containerId = isServer ? uuid() : CustomApp.containerId
    const container = Container.of(containerId)
    {
      (ctx as EnhancedNextPageContext).container = container
    }
    container.set(Context, ctx)
    CustomApp.setupContainer(container, Component)
    ctx.res?.on('finish', () => container.remove(containerId))

    const pageProps = (await Component.getInitialProps?.(ctx)) || {}
    return { pageProps, containerId, language }
  }

  static setupContainer(container: ContainerInstance, component: PageComponent) {
    setupCommonContainer(container)
    if (component.getInjectables) {
      const injectables = component.getInjectables()
      injectables.forEach(([key, value]) => {
        container.set(key, container.get(value))
      })
    }
  }

  constructor(props: CustomAppProps) {
    super(props)
    if (!isServer) {
      CustomApp.containerId = props.containerId
      const container = Container.of(props.containerId)
      if (!container.has(Context)) {
        container.set(Context, { container })
        CustomApp.setupContainer(container, props.Component)
      }
    }
  }

  render() {
    const { Component, pageProps, GlobalStateProvider, language, containerId } = this.props

    const container = Container.of(containerId)

    const Wrapper = GlobalStateProvider || React.Fragment
    const formattedLanguage = getLanguage(language)
    return (
      <IntlProvider locale={formattedLanguage} defaultLocale={'pt'} messages={messages[formattedLanguage]}>
        <ContainerContext.Provider value={container}>
          <Wrapper>
            <Head>
              <title>Outsmart Digital Admin Template</title>
            </Head>
            <ThemeProvider theme={theme}>
              <AppHeader />
              <Box p={2}>
                <Component {...pageProps} />
              </Box>
            </ThemeProvider>
            <GlobalStyles />
          </Wrapper>
        </ContainerContext.Provider>
      </IntlProvider>
    )
  }
}

export default withGlobalState(CustomApp)
