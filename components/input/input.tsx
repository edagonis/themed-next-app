import * as React from "react"
import styled from "styled-components"

const StyledInput = styled.input<IInputProps>(({ theme, size = "small" }) => {
  const {
    color: { base, link },
    settings: {
      [size]: { point_size, line_height },
    },
  } = theme
  return `
      outline: none;
      background: none;
      border: none;
      padding: .6rem 0;
      border-bottom: 1px solid ${link};
      font-size: ${point_size};
      line-height: ${line_height};
      text-indent: 1rem;
      color: ${base};
      transition: all .4s cubic-bezier(1, 0.35, 0, 0.93);
  
      &:focus {
        text-indent: 0;
      }

      &::placeholder {
        color: ${base}
      }
      `
}) as any

interface IInputProps {
  /** The name attribute of the field */
  name: string
  /** The input type */
  type?: string
  /** The size for the input  */
  size?: "small" | "medium" | "large"
  /** The value for the field */
  value?: string | number
  /** The placeholder for the input */
  placeholder?: string
  /** Class names passed through component */
  className?: string
  /** Function callback whenever any changes to the field occurs */
  onChange?(): () => void
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  return <StyledInput {...props}></StyledInput>
}

export default Input
