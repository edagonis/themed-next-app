import App from "next/app"
import Router from "next/router"
import withGA from "next-ga"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ThemeProvider } from "@zendeskgarden/react-theming"

import ThemeWrapper from "../helpers/ThemeWrapper/ThemeWrapper"
import { useApollo } from "../hooks/use-apollo"

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const { apollo } = useApollo()

    return (
      <ApolloProvider client={apollo}>
        <ThemeWrapper>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ThemeWrapper>
      </ApolloProvider>
    )
  }
}

export default withGA("UA-158796630-2", Router)(MyApp)
