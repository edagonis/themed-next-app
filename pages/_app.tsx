import React from "react"
import Head from "next/head"
import { ThemeProvider } from "theme-ui"
import { Global } from "@emotion/core"

import "nprogress/nprogress.css" //styles of nprogress
import "normalize.css/normalize.css"

import defaultTheme from "../styles/theme"
import { ApolloProvider } from "@apollo/react-hooks"
import { useApollo } from "../hooks/use-apollo"

function App(props) {
  const { Component, pageProps } = props
  const { apollo } = useApollo()

  return (
    <ApolloProvider client={apollo as any}>
      <ThemeProvider theme={defaultTheme}>
        <Head>
          <title>MMO Frontend</title>
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
    </ApolloProvider>
  )
}
export default App
