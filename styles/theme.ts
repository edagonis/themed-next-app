import { Theme } from "theme-ui"

interface CustomTheme extends Omit<Theme, "colors"> {
  colors: object
}

const defaultColorPalette = {
  primary0: "#120a10ff",
  primary1: "#22141eff",
  primary2: "#43263bff",
  primary3: "#643858ff",
  primary4: "#744266ff",
  secondary0: "#d79f9dff",
  secondary1: "#deb1afff",
  secondary2: "#edd4d3ff",
  secondary3: "#f4e6e5ff",
  secondary4: "#fafafaff",
}

const theme: CustomTheme = {
  colors: defaultColorPalette,
  fonts: {
    body:
      'Rubik, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  text: {
    heading: {
      color: "secondary2",
      marginBottom: 18,
      textAlign: "center",
    },
    error: {
      color: "#b71c1c",
    },
    xsmall: {
      fontSize: 13,
    },
  },
  sizes: {
    container: "1180px",
  },
  buttons: {
    primary: {
      color: "primary1",
      bg: "secondary3",
      "&:hover": {
        bg: "secondary2",
      },
      cursor: "pointer",
    },
    secondary: {
      color: "primary1",
      bg: "secondary2",
    },
  },
  forms: {
    input: {
      backgroundColor: "primary1",
      "&:focus": {
        outline: "none",
      },

      /** override browser agent */
      "&:-webkit-autofill": {
        boxShadow: (theme) => `0 0 0 50px ${theme.colors.primary1} inset`,
        border: (theme) => `1px solid ${theme.colors.secondary3} !important`,
        color: (theme) => `${theme.colors.secondary3} !important`,
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: 1.45,
      color: "secondary2",
      minHeight: "100%",
      background: (theme) =>
        `linear-gradient(to left bottom, ${Object.keys(theme.colors)
          .filter((key) => key.indexOf("primary") !== -1)
          .map((key) => theme.colors[key])})`,
    },
    h1: {
      variant: "text.heading",
      fontSize: 1,
      fontWeight: "normal",
    },
    h2: {
      variant: "text.heading",
      fontSize: 1,
    },
    p: {
      margin: 0,
    },
    img: {
      maxWidth: "100%",
    },
    a: {
      color: "secondary3",
      cursor: "pointer",
      "&:hover": {
        color: "secondary4",
      },
      "&:any-link": {
        color: "secondary3",
        textDecoration: "none",
      },
    },
  },
}

export default theme
