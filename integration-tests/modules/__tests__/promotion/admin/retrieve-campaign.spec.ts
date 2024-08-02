import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { IPromotionModuleService } from "@ninjajs/types"
import { CampaignBudgetType } from "@ninjajs/utils"
import { createAdminUser } from "../../../../helpers/create-admin-user"
import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(50000)

export const campaignData = {
  name: "campaign 1",
  description: "test description",
  currency: "USD",
  campaign_identifier: "test-1",
  starts_at: new Date("01/01/2023"),
  ends_at: new Date("01/01/2024"),
  budget: {
    type: CampaignBudgetType.SPEND,
    limit: 1000,
    used: 0,
  },
}

const env = { NINJA_FF_NINJA_V2: true }
const adminHeaders = {
  headers: { "x-ninja-access-token": "test_token" },
}

ninjaIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("GET /admin/campaigns", () => {
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

      it("should throw an error if id does not exist", async () => {
        const { response } = await api
          .get(`/admin/campaigns/does-not-exist`, adminHeaders)
          .catch((e) => e)

        expect(response.status).toEqual(404)
        expect(response.data.message).toEqual(
          "Campaign with id: does-not-exist was not found"
        )
      })

      it("should get the requested campaign", async () => {
        const createdCampaign = await promotionModuleService.createCampaigns(
          campaignData
        )

        const response = await api.get(
          `/admin/campaigns/${createdCampaign.id}`,
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.campaign).toEqual({
          id: expect.any(String),
          name: "campaign 1",
          description: "test description",
          currency: "USD",
          campaign_identifier: "test-1",
          starts_at: expect.any(String),
          ends_at: expect.any(String),
          budget: {
            id: expect.any(String),
            type: "spend",
            limit: 1000,
            raw_limit: {
              precision: 20,
              value: "1000",
            },
            raw_used: {
              precision: 20,
              value: "0",
            },
            used: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
            deleted_at: null,
          },
          created_at: expect.any(String),
          updated_at: expect.any(String),
          deleted_at: null,
        })
      })

      it("should get the requested campaign with filtered fields and relations", async () => {
        const createdCampaign = await promotionModuleService.createCampaigns(
          campaignData
        )

        const response = await api.get(
          `/admin/campaigns/${createdCampaign.id}?fields=name`,
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.campaign).toEqual({
          id: expect.any(String),
          name: "campaign 1",
        })
      })
    })
  },
})
