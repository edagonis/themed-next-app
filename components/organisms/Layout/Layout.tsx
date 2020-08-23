/** @jsx jsx */
import { jsx, useThemeUI, Text, Link as ThemeLink } from "theme-ui"

import * as React from "react"
import { Container } from "theme-ui"
import NProgress from "nprogress"
import Router from "next/router"
import Link from "next/link"

export interface IAppProps {
  children: React.ReactNode
  type?: "full"
}

const StyledTextDocument = (props) => {
  const { children, type } = props
  const { theme } = useThemeUI()

  return (
    <div
      sx={{
        flex: "1 auto",
        position: "relative",
        padding: "8rem 2.4rem",
        margin: "3.2rem 1.5rem",
        maxWidth: (type && "none") || "42rem",
        backgroundColor: theme.colors.primary1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",

        "&::after, &::before": {
          content: "''",
          position: "absolute",

          margin: "-16px",
          width: "32px",
          height: "32px",
          transform: "rotate(45deg)",
          backgroundColor: theme.colors.primary0,
          opacity: 0.4,
        },

        "&::before": {
          top: 0,
          right: 0,
        },

        "&::after": {
          top: 0,
          left: 0,
        },

        "@media (min-width: 45rem)": {
          margin: 0,
          marginRight: "3.2rem",
        },
      }}
    >
      {children}
    </div>
  )
}

export function Layout(props: IAppProps) {
  const themeContext = useThemeUI()
  const { theme } = themeContext
  const { children, type } = props

  /** add progress bar on component mount */
  React.useEffect(() => {
    NProgress.configure({
      template: `
      <div class="bar"
      style="background: ${theme.colors.secondary3}" role="bar">
        <div class="peg" style="box-shadow: 0 0 10px ${theme.colors.secondary3}, 0 0 5px ${theme.colors.secondary3}">
        </div>
      </div>
      <div class="spinner" role="spinner">
        <div class="spinner-icon"></div>
      </div>`,
    })

    Router.events.on("routeChangeStart", () => NProgress.start())
    Router.events.on("routeChangeComplete", () => NProgress.done())
    Router.events.on("routeChangeError", () => NProgress.done())
  }, [NProgress, Router])

  return (
    <Container>
      <div
        sx={{
          "@media(min-width: 45rem)": {
            padding: "8rem 0",
          },
        }}
      >
        <div
          sx={{
            display: "flex",
            marginTop: "3.2rem",
            flexDirection: "column",
            "@media (min-width: 45rem)": {
              flexDirection: "row",
              alignItems: "flex-start",
            },
          }}
        >
          <StyledTextDocument type={type}>{children}</StyledTextDocument>
        </div>
      </div>
    </Container>
  )
}
