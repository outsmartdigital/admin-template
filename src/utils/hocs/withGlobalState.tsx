import * as React from 'react'
import { createProvider } from 'reactn'

import { checkIfServer } from '../checkIfServer'
import { InitialGlobalState } from '../../global/InitialGlobalState'
import { getGlobal, setGlobal } from '../../global/_globalUtils/useGlobal'

/**
 * This utility function was designed to be used only with the next's App Component
 * Do not use with any other component as it will not work as expected
 * @param AppComponent
 */
export const withGlobalState = (AppComponent: any) =>
  class AppWithGlobalState extends React.Component<any> {
    static async getInitialProps(appContext: any) {
      let appProps = {}
      const GlobalStateProvider = checkIfServer() ? createProvider({ ...InitialGlobalState }) : undefined
      appContext.ctx.getGlobal = (GlobalStateProvider && GlobalStateProvider.getGlobal) || getGlobal
      appContext.ctx.setGlobal = (GlobalStateProvider && GlobalStateProvider.setGlobal) || setGlobal

      if (typeof AppComponent.getInitialProps === 'function') {
        appProps = await AppComponent.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialGlobalState: InitialGlobalState,
        GlobalStateProvider,
      }
    }
    render() {
      return <AppComponent {...this.props} />
    }
  }
