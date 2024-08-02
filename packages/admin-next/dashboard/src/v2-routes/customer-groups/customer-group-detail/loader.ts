import { Response } from "@ninjajs/ninja-js"
import { adminProductKeys } from "ninja-react"
import { LoaderFunctionArgs } from "react-router-dom"

import { AdminCustomerGroupResponse } from "@ninjajs/types"
import { ninja, queryClient } from "../../../lib/ninja"

const customerGroupDetailQuery = (id: string) => ({
  queryKey: adminProductKeys.detail(id),
  queryFn: async () =>
    ninja.admin.customerGroups.retrieve(id, {
      fields: "+customers.id",
    }),
})

export const customerGroupLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = customerGroupDetailQuery(id!)

  return (
    queryClient.getQueryData<Response<AdminCustomerGroupResponse>>(
      query.queryKey
    ) ?? (await queryClient.fetchQuery(query))
  )
}
