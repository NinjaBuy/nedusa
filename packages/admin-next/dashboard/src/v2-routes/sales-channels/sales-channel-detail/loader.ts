import { adminProductKeys } from "ninja-react"
import { LoaderFunctionArgs } from "react-router-dom"

import { AdminSalesChannelResponse } from "@ninjajs/types"
import { client } from "../../../lib/client"
import { queryClient } from "../../../lib/ninja"

const salesChannelDetailQuery = (id: string) => ({
  queryKey: adminProductKeys.detail(id),
  queryFn: async () => client.salesChannels.retrieve(id),
})

export const salesChannelLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = salesChannelDetailQuery(id!)

  return (
    queryClient.getQueryData<AdminSalesChannelResponse>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
