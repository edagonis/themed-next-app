import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export const ActiveLink = ({ children, ...props }) => {
  const router = useRouter()
  const child = React.Children.only(children)

  return (
    <Link href={props.href} {...props}>
      <span>
        {React.cloneElement(child, {
          active: router.pathname === props.href || false,
        })}
      </span>
    </Link>
  )
}
