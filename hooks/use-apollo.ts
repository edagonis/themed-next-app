import { ApolloClient } from "apollo-client"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import fetch from "node-fetch"

export function useApollo(initialState?: NormalizedCacheObject) {
  if (!process) return {}

  const {
    env: { BACKEND_GRAPHQL_ENDPOINT },
  } = process

  const link = createHttpLink({
    uri: BACKEND_GRAPHQL_ENDPOINT,
    fetch: fetch,
  })

  const apollo = new ApolloClient({
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  })

  return { apollo }
}
