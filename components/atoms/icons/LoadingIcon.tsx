/** @jsx jsx */
import { jsx } from "theme-ui"

export const LoadingIcon = ({ size = "30px", centered = false }) => (
  <svg
    className={`loading-icon ${centered ? "centered" : ""}`}
    width={size}
    height={size}
    sx={{ stroke: "secondary.0" }}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle cx="50" opacity="0.4" cy="50" fill="none" strokeWidth="14" r="40" />
    <circle
      cx="50"
      cy="50"
      fill="none"
      strokeWidth="12"
      r="40"
      strokeDasharray="60 900"
      strokeLinecap="round"
      transform="rotate(25.6557 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="0.7s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
)
