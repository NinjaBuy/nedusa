import { NinjaError } from "@ninjajs/utils"

export async function retrieveProduct(container, id, remoteQueryObject = {}) {
  // TODO: Add support for fields/expands
  const remoteQuery = container.resolve("remoteQuery")

  const variables = { id }

  const query = {
    product: {
      __args: variables,
      ...remoteQueryObject,
    },
  }

  const [product] = await remoteQuery(query)

  if (!product) {
    throw new NinjaError(
      NinjaError.Types.NOT_FOUND,
      `Product with id: ${id} not found`
    )
  }

  product.profile_id = product.profile?.id

  return product
}
