import { NinjaContainer, ProductVariantDTO } from "@ninjajs/types"

export async function getVariantsFromPriceList(
  container: NinjaContainer,
  priceListId: string
) {
  const remoteQuery = container.resolve("remoteQuery")
  const query = {
    price_list: {
      __args: { id: [priceListId] },
      prices: {
        price_set: {
          variant_link: { variant: { fields: ["id", "product_id"] } },
        },
      },
    },
  }

  const priceLists = await remoteQuery(query)
  const variants: ProductVariantDTO[] = []

  priceLists.forEach((priceList) => {
    priceList.prices?.forEach((price) => {
      const variant = price.price_set?.variant_link?.variant

      if (variant) {
        variants.push(variant)
      }
    })
  })

  return variants
}
