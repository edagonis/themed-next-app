/** @jsx jsx */
import Head from "next/head"
import { jsx, Text, Link, useThemeUI } from "theme-ui"

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
