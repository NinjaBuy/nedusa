import { ninjaIntegrationTestRunner } from "ninja-test-utils"

jest.setTimeout(30000)

ninjaIntegrationTestRunner({
  force_modules_migration: true,
  testSuite: ({ dbConnection }) => {
    describe("Standalone Modules", () => {
      beforeAll(async () => {
        process.env.POSTGRES_URL = dbConnection.manager.connection.options.url
      })

      afterAll(async () => {
        process.env.POSTGRES_URL = undefined
      })

      it("Should migrate database and initialize Product module using connection string from environment variable ", async function () {
        const { initialize, runMigrations } = require("@ninjajs/product")
        await runMigrations()

        const product = await initialize()
        const productList = await product.list()

        expect(productList).toEqual(expect.arrayContaining([]))
      })
    })
  },
})
