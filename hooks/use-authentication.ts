import { useState, useCallback, useEffect } from "react"
import { Magic } from "magic-sdk"
import { MagicSDK } from "magic-sdk/dist/cjs/src/core/sdk"

/**
 * Immediately resolves the user if he's a returning user
 * also exposes functions to handle magic link authentication
 *
 * @param {Object} magic The magic instance
 */
export const useAuthentication = () => {
  const [magic, setMagic] = useState<MagicSDK>()
  const [user, setUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const {
      env: { MAGIC_LINK_PUBLIC_KEY },
    } = process
    const magic = new Magic(MAGIC_LINK_PUBLIC_KEY)

    setMagic(magic)
  }, [process])

  /**
   * Uses magic to retrieve logged in user,
   * and then sets the current user state
   */
  const resolveUser = useCallback(
    async function () {
      if (!magic) return true

      setIsLoading(true)
      const res = await fetch("/api/user")

      if (res.status === 200) {
        let parsed = await res.json()
        const { user } = parsed

        setUser(user)
      } else {
        setUser(false)
      }

      setIsLoading(false)
    },
    [magic, setUser]
  )

  /** Make sure to resolve the user on component mounting */
  useEffect(() => {
    resolveUser()
  }, [resolveUser])

  /* Handler for logging in */
  const handleLogin = async (e) => {
    e.preventDefault()
    const email = new FormData(e.target).get("email")

    if (email) {
      const didToken = await magic.auth.loginWithMagicLink({
        email: email.toString(),
      })

      console.log(didToken)
      //   resolveUser()
    }
  }

  /** Handler for logging out */
  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, { method: "POST" })
    resolveUser()
  }

  const handleBuyApple = async () => {
    await fetch(`/api/buy-apple`, { method: "POST" })
    resolveUser()
  }

  return { user, handleLogin, handleLogout, handleBuyApple, isLoading }
}
