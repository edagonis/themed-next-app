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

const StyledText = styled.p<{ selectedSize: Size; textAlign: Align }>(
  ({ theme, selectedSize, textAlign }) => {
    const {
      settings: {
        [selectedSize]: { size, line_height },
      },
      color: { special },
    } = theme

    return `
      margin: 0;
      font-size: ${size};
      line-height: ${line_height};
      text-align: ${textAlign};
      color: ${selectedSize === "large" ? special : "inherit"}
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
    selectedSize={size}
    textAlign={align}
    className={className}
    data-testid="text"
  >
    {children}
  </StyledText>
)

export default Text
