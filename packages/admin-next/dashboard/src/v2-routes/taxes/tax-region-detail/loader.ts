import { LoaderFunctionArgs } from "react-router-dom"

import { AdminTaxRegionResponse } from "@ninjajs/types"
import { taxRegionsQueryKeys } from "../../../hooks/api/tax-regions"
import { client } from "../../../lib/client"
import { queryClient } from "../../../lib/ninja"

const taxRegionDetailQuery = (id: string) => ({
  queryKey: taxRegionsQueryKeys.detail(id),
  queryFn: async () => client.taxes.retrieveTaxRegion(id),
})

export const taxRegionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = taxRegionDetailQuery(id!)

  return (
    queryClient.getQueryData<AdminTaxRegionResponse>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
