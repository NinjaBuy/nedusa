import { adminStoreKeys } from "ninja-react"

import { client } from "../../../lib/client"
import { queryClient } from "../../../lib/ninja"
import { StoreRes } from "../../../types/api-responses"

const storeDetailQuery = () => ({
  queryKey: adminStoreKeys.details(),
  queryFn: async () => client.stores.retrieve(),
})

export const storeLoader = async () => {
  const query = storeDetailQuery()

  return (
    queryClient.getQueryData<StoreRes>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
