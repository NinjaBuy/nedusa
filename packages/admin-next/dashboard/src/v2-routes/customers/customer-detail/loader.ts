import { Response } from "@ninjajs/ninja-js"
import { AdminCustomerResponse } from "@ninjajs/types"
import { adminProductKeys } from "ninja-react"
import { LoaderFunctionArgs } from "react-router-dom"
import { ninja, queryClient } from "../../../lib/ninja"

const customerDetailQuery = (id: string) => ({
  queryKey: adminProductKeys.detail(id),
  queryFn: async () => ninja.admin.customers.retrieve(id),
})

export const customerLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = customerDetailQuery(id!)

  return (
    queryClient.getQueryData<Response<AdminCustomerResponse>>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
