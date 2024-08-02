import { IsString } from "class-validator"
import { AdminPostProductsReq as NinjaAdminPostProductsReq } from "../../api/routes/admin/products/create-product"
import { registerOverriddenValidators, validator } from "../validator"

class AdminPostProductsReq extends NinjaAdminPostProductsReq {
  @IsString()
  custom_attribute: string
}

describe("Validator", function () {
  it("should override the original validator", async function () {
    let err = await validator(NinjaAdminPostProductsReq, {
      title: "test",
    })
      .then(() => void 0)
      .catch((err) => err)

    expect(err).not.toBeDefined()

    registerOverriddenValidators(AdminPostProductsReq)

    err = await validator(NinjaAdminPostProductsReq, {
      title: "test",
    })
      .then(() => void 0)
      .catch((err) => err)

    expect(err).toBeDefined()
    expect(err.message).toEqual("custom_attribute must be a string")

    err = await validator(NinjaAdminPostProductsReq, {
      title: "test",
      custom_attribute: "test",
    })
      .then(() => void 0)
      .catch((err) => err)

    expect(err).not.toBeDefined()
  })
})
