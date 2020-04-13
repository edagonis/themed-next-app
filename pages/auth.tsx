import React from "react"

import { useAuthentication } from "../hooks/use-authentication"

const Login = () => {
  const { handleLogin, handleLogout, user, isLoading } = useAuthentication()

  if (isLoading) return <h3>Loading...</h3>

  return user ? (
    <>
      <h1>Current user: ${user}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <>
      <h1>Please sign up or login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          required={true}
          placeholder="Enter your email"
        />
        <button type="submit">Send</button>
      </form>
    </>
  )
}
export default Login
