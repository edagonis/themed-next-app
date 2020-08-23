import { useContext } from "react"

import { AccountContext } from "../contexts/AccountContext"

export function useAccountContext() {
  const contextValue = useContext(AccountContext)

  return contextValue
}
