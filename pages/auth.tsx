import React from "react"
import { Grid, Row, Col } from "@zendeskgarden/react-grid"
import Router from "next/router"

import { useAuthentication } from "../hooks/use-authentication"
import Text from "../components/text/text"

const Login = () => {
  const { handleLogin, data, error, loading } = useAuthentication()

  if (loading) return <h3>Loading...</h3>

  if (data && data.user) return Router.push("/")

  return (
    <>
      <Grid>
        <Row justifyContent="center">
          <Col md={4}>
            <Row justifyContent="center">
              <Text size="large">login/sign up</Text>
            </Row>
            <Row>
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
            </Row>
          </Col>
        </Row>
      </Grid>
    </>
  )
}
export default Login
