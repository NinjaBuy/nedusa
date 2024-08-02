import { IInventoryService } from "@ninjajs/types"
import { NinjaError } from "@ninjajs/utils"

/**
 * @oas [get] /admin/reservations/{id}
 * operationId: "GetReservationsReservation"
 * summary: "Get a Reservation"
 * description: "Retrieve a reservation's details."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the reservation.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.reservations.retrieve(reservationId)
 *       .then(({ reservation }) => {
 *         console.log(reservation.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminReservation } from "ninja-react"
 *
 *       type Props = {
 *         reservationId: string
 *       }
 *
 *       const Reservation = ({ reservationId }: Props) => {
 *         const { reservation, isLoading } = useAdminReservation(
 *           reservationId
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {reservation && <span>{reservation.inventory_item_id}</span>}
 *           </div>
 *         )
 *       }
 *
 *       export default Reservation
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/reservations/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Reservations
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminReservationsRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 */
export default async (req, res) => {
  const { id } = req.params
  const inventoryService: IInventoryService =
    req.scope.resolve("inventoryService")

  const [reservations, count] = await inventoryService.listReservationItems({
    id,
  })

  if (!count) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Reservation with id ${id} not found`
    )
  }

  res.status(200).json({ reservation: reservations[0] })
}
