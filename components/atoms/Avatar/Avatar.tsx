/** @jsx jsx */
import { jsx } from "theme-ui"

import styled from "styled-components"

const AvatarWrapper = (props) => {
  const { children, className } = props

  return (
    <span
      className={className}
      sx={{
        color: "secondary.3",
        backgroundColor: "primary.2",
        borderColor: "primary.1",
        borderStyle: "solid",
      }}
    >
      {children}
    </span>
  )
}

const StyledAvatar = styled(AvatarWrapper)`
  display: block;
  position: relative;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-width: 1px;
  border-radius: 50%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
`

const StyledAvatarName = styled.span(({ size }) => {
  const parsedSize = parseInt(size)
  const nameSize = parsedSize / 3
  const formattedSize = nameSize + "px"

  return `
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: ${formattedSize};
  max-height: ${formattedSize};
  font-size: ${formattedSize};
  line-height: ${formattedSize};
  text-align: center;
`
})

export const Avatar = ({ size, children, className }) => {
  return (
    <StyledAvatar size={size} className={className}>
      {children && <StyledAvatarName size={size}>{children}</StyledAvatarName>}
    </StyledAvatar>
  )
}

Avatar.defaultProps = {
  size: "42px",
}
