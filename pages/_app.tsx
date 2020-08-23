import React, { useEffect, useState } from "react"
import NextApp from "next/app"
import Head from "next/head"
import { parseCookies, destroyCookie } from "nookies"
import withGA from "next-ga"
import { Router } from "next/router"
import { useThemeUI, ThemeProvider } from "theme-ui"

import "nprogress/nprogress.css" //styles of nprogress
import "normalize.css/normalize.css"
import { createGlobalStyle } from "styled-components"

import { AccountContext } from "../contexts/AccountContext"
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
      -webkit-text-fill-color: ${theme.colors.secondary2};
    }
  `

  return <GlobalStyle />
}

function App(props) {
  const handleCookieDestruction = () => {
    const { ctx } = props as any

    destroyCookie(ctx, "authToken")
  }

  const { Component, pageProps } = props

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Themed Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyleRenderer />

      <AccountContext.Provider
        value={{
          onLogoutButtonClick: handleCookieDestruction,
        }}
      >
        <Component {...pageProps} />
      </AccountContext.Provider>
    </ThemeProvider>
  )
}
export default App
