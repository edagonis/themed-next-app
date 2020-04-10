import React from "react"
import { ThemeProvider } from "styled-components"

import GlobalStyle from "../../styles/global-style"
import { darkTheme } from "../../styles/dark-theme"

/**
 * Will wrap children components into a ThemeProvider
 */
const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />

      {children}
    </ThemeProvider>
  )
}

export default ThemeWrapper
