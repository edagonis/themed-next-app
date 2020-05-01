import App from "next/app"
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

export default MyApp
