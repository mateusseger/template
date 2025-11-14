import { QueryClient, QueryCache } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache(),
})
