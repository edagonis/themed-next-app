import React from "react"
import Router from "next/router"
import styled from "styled-components"

import { useAuthentication } from "../hooks/use-authentication"
import Text from "../components/text/text"
import Layout from "../components/layout/layout"

const StyledTitleWrapper = styled.div`
  margin-bottom: 1.6rem;
`

const Login = () => {
  const { handleLogin, data, error, loading } = useAuthentication()

  if (loading) return <h3>Loading...</h3>

  if (data && data.user) return Router.push("/")

  return (
    <Layout>
      <StyledTitleWrapper>
        <Text size="large" align="center">
          login/sign up
        </Text>
      </StyledTitleWrapper>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          required={true}
          placeholder="Enter your email"
        />
        {error && "error"}
        <button type="submit">Send</button>
      </form>
    </Layout>
  )
}
export default Login
