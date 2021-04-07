/** @jsx jsx */
import Link from "next/link"
import { jsx, Text, useColorMode } from "theme-ui"

import { Layout } from "../components/organisms/Layout/Layout"

export default function Home() {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <div className="container">
      <main>
        <Layout>
          <Text as="h1" sx={{ fontSize: 22 }}>
            Themed Next App
          </Text>
          <Text>abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd</Text>
          <button
            onClick={(e) => {
              setColorMode(colorMode === "default" ? "light" : "default")
            }}
          >
            Toggle {colorMode === "default" ? "light" : "dark"}
          </button>

          <Link href="/play">
            <p>
              <a>play</a>
            </p>
          </Link>
        </Layout>
      </main>
    </div>
  )
}
