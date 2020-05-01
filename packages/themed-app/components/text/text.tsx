import React from "react"
import styled from "styled-components"

type Size = "xsmall" | "small" | "medium" | "large"
type Align = "left" | "center" | "right"

interface Props {
  size?: Size
  className?: string
  align?: Align
  children?: React.ReactNode
}

const StyledText = styled.p<{ size: Size; textAlign: Align }>(
  ({ theme, size, textAlign }) => {
    const {
      settings: {
        [size]: { point_size, line_height },
      },
      color: { special },
    } = theme

    return `
      margin: 0;
      font-size: ${point_size};
      line-height: ${line_height};
      text-align: ${textAlign};
      color: ${size === "large" ? special : "inherit"}
  `
  }
)

/**
 * Component responsible for rendering default text attributes and styles according to props
 */
const Text: React.FC<Props> = ({
  size = "small",
  align = "left",
  children,
  className,
}) => (
  <StyledText
    size={size}
    textAlign={align}
    className={className}
    data-testid="text"
  >
    {children}
  </StyledText>
)

export default Text
