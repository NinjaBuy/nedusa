import { AdminProductsListRes } from "@ninjajs/ninja"
import { Response } from "@ninjajs/ninja-js"
import { QueryClient } from "@tanstack/react-query"

import { ninja, queryClient } from "../../../lib/ninja"
import { productsQueryKeys } from "../../../hooks/api/products"

const productsListQuery = () => ({
  queryKey: productsQueryKeys.list({ limit: 20, offset: 0 }),
  queryFn: async () => ninja.admin.products.list({ limit: 20, offset: 0 }),
})

export const productsLoader = (client: QueryClient) => {
  return async () => {
    const query = productsListQuery()

    return (
      queryClient.getQueryData<Response<AdminProductsListRes>>(
        query.queryKey
      ) ?? (await client.fetchQuery(query))
    )
  }
}
