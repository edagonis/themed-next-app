/** @jsx jsx */
import { jsx } from "theme-ui"

import * as React from "react"
import { Box, Flex, Button, Text } from "theme-ui"
import { Label, Input, Checkbox, Link as ThemeLink } from "theme-ui"
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link"
import { setCookie } from "nookies"

import { Layout } from "../../components/organisms/Layout/Layout"
import { useRouter } from "next/router"
import { useAccountContext } from "../../hooks/useAccountContext"

type FormValues = {
  name: string
  password: string
}

function Login() {
  const accountContext = useAccountContext()
  const router = useRouter()
  const { details, fetchAndUpdateAccountDetails } = accountContext
  const { register, handleSubmit } = useForm<FormValues>()
  const [formMessage, setFormMessage] = React.useState({
    messages: [],
    type: "",
  })

  React.useEffect(() => {
    if (details) {
      router.push("/")
    }
  }, [details])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const rawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      )

      const parsedResponse = await rawResponse.json()
      const { message } = parsedResponse

      if (!rawResponse.ok) {
        const messages = [message || "An error occurred. Please, try again"]

        setFormMessage({
          messages,
          type: "error",
        })
      } else {
        setCookie(null, "authToken", parsedResponse.authToken, {
          maxAge: 1000 * 60 * 60,
          path: "/",
        })

        setFormMessage({
          messages: [message],
          type: "success",
        })

        await fetchAndUpdateAccountDetails()
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
        <h2 sx={{ fontSize: 20 }}>login</h2>

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="name">account name</Label>
          <Input ref={register} name="name" id="name" mb={3} />
          <Label htmlFor="password">password</Label>
          <Input
            ref={register}
            type="password"
            name="password"
            id="password"
            mb={3}
          />

          <Flex pt={2} pb={2} sx={{ justifyContent: "flex-end" }}>
            <Link href="/auth/register">
              <ThemeLink>register</ThemeLink>
            </Link>
          </Flex>

          {/* <Box>
            <Label mb={3} sx={{ alignItems: "center" }}>
              <Checkbox />
              remember me
            </Label>
          </Box> */}

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
