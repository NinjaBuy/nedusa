import { DataSource } from "typeorm"
import { ProductCategory } from "@ninjajs/ninja"

export const simpleProductCategoryFactory = async (
  dataSource: DataSource,
  data: Partial<ProductCategory> = {}
): Promise<ProductCategory> => {
  const manager = dataSource.manager
  const productCategory = manager.create(ProductCategory, data)

  return (await manager.save(productCategory)) as ProductCategory
}
