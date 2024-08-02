import Ninja from "@ninjajs/ninja-js"
import { QueryClient } from "@tanstack/react-query"

export const NINJA_BACKEND_URL =
  import.meta.env.VITE_NINJA_ADMIN_BACKEND_URL || "http://localhost:9000"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 90000,
      retry: 1,
    },
  },
})

export const ninja = new Ninja({
  baseUrl: NINJA_BACKEND_URL,
  maxRetries: 1,
})
