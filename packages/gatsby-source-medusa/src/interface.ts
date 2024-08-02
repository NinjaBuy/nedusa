interface NinjaPluginOptions {
  storeUrl: string
  apiKey: string
}

interface NinjaProductImage {
  url: string
  metadata: Record<string, unknown> | null
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

interface INinjaOperation {
  execute: () => Promise<any[]>
  name: string
}

interface IOperations {
  createProductsOperation: INinjaOperation
  createCollectionsOperation: INinjaOperation
  createRegionsOperation: INinjaOperation
  createOrdersOperation: INinjaOperation
  incrementalProductsOperation: (date: string) => INinjaOperation
  incrementalCollectionsOperation: (date: string) => INinjaOperation
  incrementalRegionsOperation: (date: string) => INinjaOperation
  incrementalOrdersOperation: (date: string) => INinjaOperation
}
