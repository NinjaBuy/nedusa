import {
  AdminGetPromotionsParams,
  AdminPromotionsListRes,
} from "@ninjajs/ninja"
import { Response } from "@ninjajs/ninja-js"
import { QueryClient } from "@tanstack/react-query"
import { promotionsQueryKeys } from "../../../hooks/api/promotions"
import { ninja, queryClient } from "../../../lib/ninja"

const params = {
  limit: 20,
  offset: 0,
}

const promotionsListQuery = () => ({
  queryKey: promotionsQueryKeys.list(params),
  queryFn: async () =>
    ninja.admin.custom.get<AdminGetPromotionsParams, AdminPromotionsListRes>(
      "/promotions",
      params
    ),
})

export const promotionsLoader = (client: QueryClient) => {
  return async () => {
    const query = promotionsListQuery()

    return (
      queryClient.getQueryData<Response<AdminPromotionsListRes>>(
        query.queryKey
      ) ?? (await client.fetchQuery(query))
    )
  }
}
