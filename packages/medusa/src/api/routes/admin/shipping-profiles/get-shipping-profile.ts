import {
  defaultAdminShippingProfilesFields,
  defaultAdminShippingProfilesRelations,
} from "."

import { ShippingProfileService } from "../../../../services"

/**
 * @oas [get] /admin/shipping-profiles/{id}
 * operationId: "GetShippingProfilesProfile"
 * summary: "Get a Shipping Profile"
 * description: "Retrieve a Shipping Profile's details."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Shipping Profile.
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.shippingProfiles.retrieve(profileId)
 *       .then(({ shipping_profile }) => {
 *         console.log(shipping_profile.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminShippingProfile } from "ninja-react"
 *
 *       type Props = {
 *         shippingProfileId: string
 *       }
 *
 *       const ShippingProfile = ({ shippingProfileId }: Props) => {
 *         const {
 *           shipping_profile,
 *           isLoading
 *         } = useAdminShippingProfile(
 *           shippingProfileId
 *         )
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {shipping_profile && (
 *               <span>{shipping_profile.name}</span>
 *             )}
 *           </div>
 *         )
 *       }
 *
 *       export default ShippingProfile
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/shipping-profiles/{id}' \
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
 *           $ref: "#/components/schemas/AdminShippingProfilesRes"
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
  const { profile_id } = req.params
  const profileService: ShippingProfileService = req.scope.resolve(
    "shippingProfileService"
  )

  const profile = await profileService.retrieve(profile_id, {
    select: defaultAdminShippingProfilesFields,
    relations: defaultAdminShippingProfilesRelations,
  })

  res.status(200).json({ shipping_profile: profile })
}
