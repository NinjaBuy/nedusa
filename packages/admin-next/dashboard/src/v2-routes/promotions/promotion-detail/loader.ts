import { AdminPromotionRes } from "@ninjajs/ninja"
import { Response } from "@ninjajs/ninja-js"
import { LoaderFunctionArgs } from "react-router-dom"
import { promotionsQueryKeys } from "../../../hooks/api/promotions"
import { client } from "../../../lib/client"
import { queryClient } from "../../../lib/ninja"

const promotionDetailQuery = (id: string) => ({
  queryKey: promotionsQueryKeys.detail(id),
  queryFn: () => client.promotions.retrieve(id),
})

export const promotionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = promotionDetailQuery(id!)

  return (
    queryClient.getQueryData<Response<AdminPromotionRes>>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
