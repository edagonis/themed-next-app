import React from "react"
import Head from "next/head"
import { useThemeUI, ThemeProvider } from "theme-ui"

import "nprogress/nprogress.css" //styles of nprogress
import "normalize.css/normalize.css"
import { createGlobalStyle } from "styled-components"

import defaultTheme from "../styles/theme"

const GlobalStyleRenderer = () => {
  const { theme } = useThemeUI()

  const GlobalStyle = createGlobalStyle`
    html {
      font-size: 62.5%;
    }

    html, body {
      min-height: 100%
    }

    body {
      font-family: 'Baloo 2', Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", cursive, sans-serif;
      font-size: 1.6rem;
      text-rendering: optimizeLegibility;
    }

    img {
      max-width: 100%;
      heigith: auto;
    }

    input:-webkit-autofill {
      -webkit-text-fill-color: ${theme.colors.secondary[2]};
    }
  `

  return <GlobalStyle />
}

function App(props) {
  const { Component, pageProps } = props

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Themed Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyleRenderer />

      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default App
