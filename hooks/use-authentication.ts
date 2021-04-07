import { useState, useEffect } from "react"
import { Magic } from "magic-sdk"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { CREATE_AUTHENTICATION_MUTATION } from "../queries/authentication"
import { USER_QUERY } from "../queries/user"

/**
 * Immediately resolves the user if he's a returning user
 * also exposes functions to handle magic link authentication
 *
 * @param {Object} magic The magic instance
 */
export const useAuthentication = () => {
  const [magic, setMagic] = useState<any>()

  /** Does nothing on server side */
  if (typeof window === "undefined") return { data: {} }

  const accessToken =
    window && JSON.parse(window.localStorage.getItem("accessToken"))

  const [createAuthentication] = useMutation(CREATE_AUTHENTICATION_MUTATION)
  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: {
      accessToken,
    },
  })

  useEffect(() => {
    const {
      env: { MAGIC_LINK_PUBLIC_KEY },
    } = process
    const magic = new Magic(MAGIC_LINK_PUBLIC_KEY)

    setMagic(magic)
  }, [process])

  /* Handler for logging in */
  const handleLogin = async (e) => {
    e.preventDefault()
    const email = new FormData(e.target).get("email")

    if (email) {
      const didToken = await magic.auth.loginWithMagicLink({
        email: email.toString(),
      })

      const result = await createAuthentication({ variables: { didToken } })
      const {
        data: {
          createAuthentication: { accessToken },
        },
      } = result

      localStorage.setItem("accessToken", JSON.stringify(accessToken))
      window.location.reload()
    }
  }

  /** Handler for logging out */
  const handleLogout = async () => {
    localStorage.removeItem("accessToken")
    window.location.reload()
  }

  const handleBuyApple = async () => {
    await fetch(`/api/buy-apple`, { method: "POST" })
  }

  return { data, error, loading, handleLogin, handleLogout, handleBuyApple }
}
