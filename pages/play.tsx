/** @jsx jsx */
import { jsx } from "theme-ui"
import dynamic from "next/dynamic"
import { useAuthentication } from "../hooks/use-authentication"

const GameWithNoSSR = dynamic(() => import("../components/game/game"), {
  ssr: false,
})

export default function Play() {
  const { data, loading, handleLogout } = useAuthentication()

  console.log(data)
  return (
    <div className="container">
      <main>
        <GameWithNoSSR
          user={{ name: "Eduardo", email: "eduardofidera@gmail.com" }}
        />
      </main>
    </div>
  )
}
