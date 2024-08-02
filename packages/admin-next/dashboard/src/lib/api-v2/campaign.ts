import {
  AdminCampaignRes,
  AdminCampaignsListRes,
  AdminGetCampaignsCampaignParams,
  AdminGetCampaignsParams,
  AdminPostCampaignsCampaignReq,
} from "@ninjajs/ninja"
import { useMutation } from "@tanstack/react-query"
import { queryKeysFactory, useAdminCustomQuery } from "ninja-react"
import { ninja } from "../ninja"

const QUERY_KEY = "admin_campaigns"
export const adminCampaignKeys = queryKeysFactory<
  typeof QUERY_KEY,
  AdminGetCampaignsParams
>(QUERY_KEY)

export const adminCampaignQueryFns = {
  list: (query: AdminGetCampaignsParams) =>
    ninja.admin.custom.get(`/admin/campaigns`, query),
  detail: (id: string) => ninja.admin.custom.get(`/admin/campaigns/${id}`),
}

export const useV2Campaigns = (
  query?: AdminGetCampaignsParams,
  options?: object
) => {
  const { data, ...rest } = useAdminCustomQuery<
    AdminGetCampaignsParams,
    AdminCampaignsListRes
  >("/admin/campaigns", adminCampaignKeys.list(query), query, options)

  return { ...data, ...rest }
}

export const useV2Campaign = (
  id: string,
  query?: AdminGetCampaignsParams,
  options?: object
) => {
  const { data, ...rest } = useAdminCustomQuery<
    AdminGetCampaignsCampaignParams,
    AdminCampaignRes
  >(`/admin/campaigns/${id}`, adminCampaignKeys.detail(id), query, options)

  return { ...data, ...rest }
}

export const useV2DeleteCampaign = (id: string) => {
  return useMutation(() => ninja.admin.custom.delete(`/admin/campaigns/${id}`))
}

export const useV2PostCampaign = (id: string) => {
  return useMutation((args: AdminPostCampaignsCampaignReq) =>
    ninja.client.request("POST", `/admin/campaigns/${id}`, args)
  )
}
