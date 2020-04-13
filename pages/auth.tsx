import React from "react"

import { useAuthentication } from "../hooks/use-authentication"

const Login = () => {
  const {
    handleLogin,
    handleLogout,
    data,
    error,
    loading,
  } = useAuthentication()

  if (loading) return <h3>Loading...</h3>
  if (error) return <p>error</p>

  const { user } = data

  return user ? (
    <>
      <h1>Current user: {user.email}</h1>
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
