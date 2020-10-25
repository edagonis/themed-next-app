import React from "react"
import Head from "next/head"
import { ThemeProvider } from "theme-ui"
import { Global } from "@emotion/core"

import "nprogress/nprogress.css" //styles of nprogress
import "normalize.css/normalize.css"

import defaultTheme from "../styles/theme"

function App(props) {
  const { Component, pageProps } = props

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Themed Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global
        styles={{
          html: {
            fontSize: "62.5%",
          },
          "html, body ": {
            minHeight: "100%",
          },
          "*": {
            boxSizing: "border-box",
          },
        }}
      />

      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default App
