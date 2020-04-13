import { useState, useCallback, useEffect } from "react"
import { Magic } from "magic-sdk"
import { MagicSDK } from "magic-sdk/dist/cjs/src/core/sdk"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

/**
 * Immediately resolves the user if he's a returning user
 * also exposes functions to handle magic link authentication
 *
 * @param {Object} magic The magic instance
 */
export const useAuthentication = () => {
  const [magic, setMagic] = useState<MagicSDK>()

  const USER_QUERY = gql`
    query {
      user(
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDY4RTA5MWExOTBjOTUzNURmMGUxOTgyMDk4MjYyMkRlRmRlNTI0QTQifQ.6oSaYFO1k2__Q_t3XItfu03t8XgTzOcNe00GhwI_ieI"
      ) {
        email
        name
      }
    }
  `

  const { data, loading, error } = useQuery(USER_QUERY)

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

      localStorage.setItem("didToken", JSON.stringify(didToken))
      //   resolveUser()
    }
  }

  /** Handler for logging out */
  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, { method: "POST" })
  }

  const handleBuyApple = async () => {
    await fetch(`/api/buy-apple`, { method: "POST" })
  }

  return { data, error, loading, handleLogin, handleLogout, handleBuyApple }
}
