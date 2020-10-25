/** @jsx jsx */
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
          <button
            onClick={(e) => {
              setColorMode(colorMode === "default" ? "light" : "default")
            }}
          >
            Toggle {colorMode === "default" ? "light" : "dark"}
          </button>
        </Layout>
      </main>
    </div>
  )
}
