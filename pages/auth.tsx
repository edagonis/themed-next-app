/** @jsx jsx */
import { jsx } from "theme-ui"
import Router from "next/router"
import { Input, Text } from "theme-ui"

import { useAuthentication } from "../hooks/use-authentication"
import { TextDocument } from "../components/organisms/Layout/TextDocument"

const Login = () => {
  const { handleLogin, data, error, loading } = useAuthentication()

  if (loading) return <h3>Loading...</h3>

  if (data && data.user) {
    Router.push("/")
    return <p>redirecting...</p>
  }

  return (
    <TextDocument>
      <div
        sx={{
          marginBottom: "1.6rem",
        }}
      >
        <Text>login/sign up</Text>
      </div>
      <form onSubmit={handleLogin}>
        <Input name="email" placeholder="email" />
        {error && "error"}
        <button type="submit">Send</button>
      </form>
    </TextDocument>
  )
}
export default Login
