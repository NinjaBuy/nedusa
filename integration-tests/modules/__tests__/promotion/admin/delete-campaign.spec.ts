import { IPromotionModuleService } from "@ninjajs/types"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { createAdminUser } from "../../../../helpers/create-admin-user"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("DELETE /admin/campaigns/:id", () => {
      let appContainer
      let promotionModuleService: IPromotionModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        promotionModuleService = appContainer.resolve(
          ModuleRegistrationName.PROMOTION
        )
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should delete campaign successfully", async () => {
        const [createdCampaign] = await promotionModuleService.createCampaigns([
          {
            name: "test",
            campaign_identifier: "test",
            starts_at: new Date("01/01/2024"),
            ends_at: new Date("01/01/2025"),
          },
        ])

        const deleteRes = await api.delete(
          `/admin/campaigns/${createdCampaign.id}`,
          adminHeaders
        )

        expect(deleteRes.status).toEqual(200)

        const campaigns = await promotionModuleService.listCampaigns({
          id: [createdCampaign.id],
        })

        expect(campaigns.length).toEqual(0)
      })
    })
  },
})
