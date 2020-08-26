import React from "react";
import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * By extending the NextJs' Document class, we can customize the base HTML document generated for
 * every page. We do this, for instance, in order to use styled-components in server-side rendering.
 * read more: https://nextjs.org/docs/advanced-features/custom-document
 */
export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {/* You can add global styles below, like loading fonts etc */}
            <style
              dangerouslySetInnerHTML={{ __html: `body { margin: 0 } ` }}
            />
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
}
