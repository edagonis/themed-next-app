import React from "react"
import Router from "next/router"
import styled from "styled-components"

import { useAuthentication } from "../hooks/use-authentication"
import Text from "../components/text/text"
import Layout from "../components/layout/layout"
import Input from "../components/input/input"

const StyledTitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`

const Login = () => {
  const { handleLogin, data, error, loading } = useAuthentication()

  if (loading) return <h3>Loading...</h3>

  if (data && data.user) {
    Router.push("/")
    return <p>redirecting...</p>
  }

  return (
    <Layout>
      <StyledTitleWrapper>
        <Text size="large" align="center">
          login/sign up
        </Text>
      </StyledTitleWrapper>
      <form onSubmit={handleLogin}>
        <Input name="email" size="small" placeholder="email" />
        {error && "error"}
        <button type="submit">Send</button>
      </form>
    </Layout>
  )
}
export default Login
