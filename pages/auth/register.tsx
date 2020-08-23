/** @jsx jsx */
import { jsx } from "theme-ui"

import * as React from "react"
import { Box, Flex, Button, Select, Text } from "theme-ui"
import { Label, Input, Checkbox } from "theme-ui"
import { useRouter } from "next/router"

import { Layout } from "../../components/organisms/Layout/Layout"

export interface IAppProps {}

function Login(props: IAppProps) {
  const router = useRouter()
  const [formMessage, setFormMessage] = React.useState<{
    messages: string[]
    type: string
  }>({
    messages: [],
    type: "",
  })

  async function handleFormSubmit(e) {
    e.preventDefault()
    const { name, email, country, password, password2 } = e.target

    const accountToCreate = {
      name: name.value,
      email: email.value,
      country: country.value,
      password: password.value,
      password2: password2.value,
    }

    try {
      const rawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/create`,
        {
          method: "POST",
          body: JSON.stringify({ account: accountToCreate }),
        }
      )

      const parsedResponse = await rawResponse.json()

      if (!rawResponse.ok) {
        const messages = (parsedResponse.errors &&
          parsedResponse.errors.map((error) => error.message)) || [
          "An error occurred. Please, try again",
        ]

        setFormMessage({
          messages,
          type: "error",
        })
      } else {
        setFormMessage({
          messages: ["Account created successfully!"],
          type: "success",
        })
      }

      if (rawResponse.ok) {
        router.push("/auth/login")
      }
    } catch (e) {
      console.log(e)

      throw e
    }
  }
  return (
    <Layout>
      <Flex
        sx={{
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: "30rem",
          margin: "0 auto",
        }}
      >
        <h2 sx={{ fontSize: 20 }}>register</h2>

        <Box as="form" onSubmit={handleFormSubmit}>
          <Label htmlFor="name">account name</Label>
          <Input name="name" id="name" mb={3} required />

          <Label htmlFor="email">email</Label>
          <Input type="email" name="email" id="email" mb={3} required />

          <Label htmlFor="password">password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            mb={3}
            required
          />

          <Label htmlFor="password2">repeat password</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            mb={3}
            required
          />

          <Box mb={2}>
            {(formMessage.messages &&
              formMessage.messages.map((message) => (
                <Text key={message}>{message}</Text>
              ))) ||
              null}
          </Box>
          <Button>Submit</Button>
        </Box>
      </Flex>
    </Layout>
  )
}

export default Login
