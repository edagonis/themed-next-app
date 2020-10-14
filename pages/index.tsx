/** @jsx jsx */
import { jsx, Text } from "theme-ui"

import { Layout } from "../components/organisms/Layout/Layout"

export default function Home() {
  return (
    <div className="container">
      <main>
        <Layout>
          <Text as="h1" sx={{ fontSize: 22 }}>
            Themed Next App
          </Text>
        </Layout>
      </main>
    </div>
  )
}
