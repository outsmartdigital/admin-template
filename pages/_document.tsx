import React from 'react'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

/**
 * By extending the NextJs' Document class, we can customize the base HTML document generated for
 * every page. We do this, for instance, in order to use styled-components in server-side rendering.
 * read more: https://nextjs.org/docs/advanced-features/custom-document
 */
export default class CustomDocument extends Document<{ globalState: any }> {
  static async getInitialProps(ctx: DocumentContext & { getGlobal: any }) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      const globalState = { ...ctx.getGlobal() }
      return {
        ...initialProps,
        globalState,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { globalState } = this.props
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              __INITIAL_GLOBAL_STATE__ = ${JSON.stringify(globalState, null, 4)};
              `,
            }}
          />
          <NextScript />
        </body>
      </Html>
    )
  }
}
