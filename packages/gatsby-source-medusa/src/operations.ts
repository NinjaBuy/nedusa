import { createClient } from "./client"

export function createOperations(options: NinjaPluginOptions): IOperations {
  const client = createClient(options)

  function createOperation(
    name: "products" | "collections" | "regions" | "orders",
    queryString?: string
  ): INinjaOperation {
    return {
      execute: (): Promise<any[]> => client[name](queryString),
      name: name,
    }
  }

  return {
    createProductsOperation: createOperation("products"),
    createCollectionsOperation: createOperation("collections"),
    createRegionsOperation: createOperation("regions"),
    createOrdersOperation: createOperation("orders"),
    incrementalProductsOperation: (date: string): any =>
      createOperation("products", date),
    incrementalCollectionsOperation: (date: string): any =>
      createOperation("collections", date),
    incrementalRegionsOperation: (date: string): any =>
      createOperation("regions", date),
    incrementalOrdersOperation: (date: string): any =>
      createOperation("orders", date),
  }
}
