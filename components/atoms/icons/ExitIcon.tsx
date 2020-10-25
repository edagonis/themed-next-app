/** @jsx jsx */
import { jsx } from "theme-ui"

interface Props {
  className?: string
  color?: string
  size?: string
}

const ExitIcon = ({ className = "", size = "24" }: Props) => {
  const parsedSize = parseInt(size) / 2

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path
        d={`M${parsedSize}.7 ${parsedSize}.2l-${parsedSize} ${parsedSize} ${parsedSize}-${parsedSize} ${parsedSize} ${parsedSize}-${parsedSize}-${parsedSize}zm0 0l${parsedSize}-${parsedSize}-${parsedSize} ${parsedSize}L.7.2l${parsedSize} ${parsedSize}z`}
        sx={{ stroke: "secondary.2" }}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

export default ExitIcon
