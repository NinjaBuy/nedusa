import { listShippingOptionsForCartWorkflow } from "@ninjajs/core-flows"
import { ModuleRegistrationName } from "@ninjajs/modules-sdk"
import { ICartModuleService } from "@ninjajs/types"
import { NinjaRequest, NinjaResponse } from "../../../../types/routing"

export const GET = async (req: NinjaRequest, res: NinjaResponse) => {
  const { cart_id } = req.params

  const cartService = req.scope.resolve<ICartModuleService>(
    ModuleRegistrationName.CART
  )

  const cart = await cartService.retrieve(cart_id, {
    select: [
      "id",
      "sales_channel_id",
      "subtotal",
      "currency_code",
      "shipping_address.city",
      "shipping_address.country_code",
      "shipping_address.province",
    ],
    relations: ["shipping_address"],
  })

  const shippingOptions = await listShippingOptionsForCartWorkflow(
    req.scope
  ).run({
    input: {
      cart_id: cart.id,
      sales_channel_id: cart.sales_channel_id,
      currency_code: cart.currency_code,
      shipping_address: {
        city: cart.shipping_address?.city,
        country_code: cart.shipping_address?.country_code,
        province: cart.shipping_address?.province,
      },
    },
  })

  res.json({ shipping_options: shippingOptions })
}
