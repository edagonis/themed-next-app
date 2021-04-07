/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { useRouter } from "next/router"

import { useAuthentication } from "../hooks/use-authentication"
import { LoadingIcon } from "../components/atoms/icons/LoadingIcon"

const GameWithNoSSR = dynamic(() => import("../components/game/game"), {
  ssr: false,
})

export default function Play() {
  const { data, loading, handleLogout } = useAuthentication()
  const router = useRouter()

  const user = !loading && data && data.user

  useEffect(() => {
    if (!loading && (!data || !data.user)) {
      router.push("/auth")
    }
  }, [loading, data])

  return (
    <div className="container">
      <main>
        {user && <Text>logged in as: {user.email}</Text>}
        {user && <Text>characters: </Text>}
        {user && (
          <Text>
            <a onClick={handleLogout}>logout</a>
          </Text>
        )}
        {loading && <LoadingIcon />}

        {user && <GameWithNoSSR user={user} />}
      </main>
    </div>
  )
}
