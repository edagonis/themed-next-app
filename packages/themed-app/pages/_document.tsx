import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet, createGlobalStyle } from "styled-components"

const FontGlobalStyle = createGlobalStyle`
  body {
    font-family: 'Baloo 2', cursive,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-rendering: optimizeLegibility;
  }
`

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
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
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html:
                '</script><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Baloo+2&display=swap" media="print" onload="this.media=\'all\'" /><script>',
            }}
          />
        </Head>
        <body>
          <FontGlobalStyle />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
