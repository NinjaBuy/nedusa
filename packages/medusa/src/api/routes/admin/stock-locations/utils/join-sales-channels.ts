import { StockLocationDTO, StockLocationExpandedDTO } from "@ninjajs/types"
import { promiseAll } from "@ninjajs/utils"
import {
  SalesChannelLocationService,
  SalesChannelService,
} from "../../../../../services"

const joinSalesChannels = async (
  locations: StockLocationDTO[],
  channelLocationService: SalesChannelLocationService,
  salesChannelService: SalesChannelService
): Promise<StockLocationExpandedDTO[]> => {
  return await promiseAll(
    locations.map(async (location: StockLocationExpandedDTO) => {
      const salesChannelIds = await channelLocationService.listSalesChannelIds(
        location.id
      )
      const [salesChannels] = await salesChannelService.listAndCount(
        {
          id: salesChannelIds,
        },
        {}
      )

      location.sales_channels = salesChannels

      return location
    })
  )
}

export { joinSalesChannels }
