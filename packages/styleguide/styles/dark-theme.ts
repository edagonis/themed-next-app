import { settings } from "./settings"
import { DefaultTheme } from "styled-components"

export const darkTheme: DefaultTheme = {
  color: {
    baseBackground: "#5B5F97",
    base: "#FFFFFB",
    special: "#FFC145",
    link: "#FFBFBF",
  },
  ...settings,
}
