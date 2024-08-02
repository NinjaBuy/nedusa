import { ShippingProfileService } from "../../../../services"

/**
 * @oas [get] /admin/shipping-profiles
 * operationId: "GetShippingProfiles"
 * summary: "List Shipping Profiles"
 * description: "Retrieve a list of Shipping Profiles."
 * x-authenticated: true
 * x-codegen:
 *   method: list
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.shippingProfiles.list()
 *       .then(({ shipping_profiles }) => {
 *         console.log(shipping_profiles.length);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminShippingProfiles } from "ninja-react"
 *
 *       const ShippingProfiles = () => {
 *         const {
 *           shipping_profiles,
 *           isLoading
 *         } = useAdminShippingProfiles()
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {shipping_profiles && !shipping_profiles.length && (
 *               <span>No Shipping Profiles</span>
 *             )}
 *             {shipping_profiles && shipping_profiles.length > 0 && (
 *               <ul>
 *                 {shipping_profiles.map((profile) => (
 *                   <li key={profile.id}>{profile.name}</li>
 *                 ))}
 *               </ul>
 *             )}
 *           </div>
 *         )
 *       }
 *
 *       export default ShippingProfiles
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/shipping-profiles' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Shipping Profiles
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminShippingProfilesListRes"
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
  const profileService: ShippingProfileService = req.scope.resolve(
    "shippingProfileService"
  )

  const data = await profileService.list()

  res.status(200).json({ shipping_profiles: data })
}
