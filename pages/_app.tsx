import App from "next/app"
import Router from "next/router"
import withGA from "next-ga"
import React from "react"

import ThemeWrapper from "../helpers/ThemeWrapper/ThemeWrapper"

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    )
  }
}

export default withGA("UA-158796630-2", Router)(MyApp)
