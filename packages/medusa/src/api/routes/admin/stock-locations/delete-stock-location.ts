import { IInventoryService, IStockLocationService } from "@ninjajs/types"
import { promiseAll } from "@ninjajs/utils"
import { EntityManager } from "typeorm"
import { SalesChannelLocationService } from "../../../../services"

/**
 * @oas [delete] /admin/stock-locations/{id}
 * operationId: "DeleteStockLocationsStockLocation"
 * summary: "Delete a Stock Location"
 * description: "Delete a Stock Location."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Stock Location.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.stockLocations.delete(stockLocationId)
 *       .then(({ id, object, deleted }) => {
 *         console.log(id)
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminDeleteStockLocation } from "ninja-react"
 *
 *       type Props = {
 *         stockLocationId: string
 *       }
 *
 *       const StockLocation = ({ stockLocationId }: Props) => {
 *         const deleteLocation = useAdminDeleteStockLocation(
 *           stockLocationId
 *         )
 *         // ...
 *
 *         const handleDelete = () => {
 *           deleteLocation.mutate(void 0, {
 *             onSuccess: ({ id, object, deleted }) => {
 *               console.log(id)
 *             }
 *           })
 *         }
 *       }
 *
 *       export default StockLocation
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/admin/stock-locations/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Stock Locations
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminStockLocationsDeleteRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 */
export default async (req, res) => {
  const { id } = req.params

  const stockLocationService: IStockLocationService = req.scope.resolve(
    "stockLocationService"
  )

  const inventoryService: IInventoryService =
    req.scope.resolve("inventoryService")

  const salesChannelLocationService: SalesChannelLocationService =
    req.scope.resolve("salesChannelLocationService")

  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    await salesChannelLocationService
      .withTransaction(transactionManager)
      .removeLocation(id)

    await stockLocationService.delete(id)

    if (inventoryService) {
      await promiseAll([
        inventoryService.deleteInventoryItemLevelByLocationId(id),
        inventoryService.deleteReservationItemByLocationId(id),
      ])
    }
  })

  res.status(200).send({
    id,
    object: "stock_location",
    deleted: true,
  })
}
