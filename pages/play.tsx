/** @jsx jsx */
import { jsx } from "theme-ui"
import dynamic from "next/dynamic"

const GameWithNoSSR = dynamic(() => import("../components/game/game"), {
  ssr: false,
})

export default function Play() {
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
