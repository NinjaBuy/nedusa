import { AdminRegionsRes } from "@ninjajs/ninja"
import { Response } from "@ninjajs/ninja-js"
import { adminRegionKeys } from "ninja-react"
import { LoaderFunctionArgs } from "react-router-dom"

import { ninja, queryClient } from "../../../lib/ninja"

const regionQuery = (id: string) => ({
  queryKey: adminRegionKeys.detail(id),
  queryFn: async () =>
    ninja.admin.regions.retrieve(id, { fields: "*payment_providers" }),
})

export const regionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = regionQuery(id!)

  return (
    queryClient.getQueryData<Response<AdminRegionsRes>>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
