import { Request, Response } from "express"

import ProductCategoryService from "../../../../services/product-category"
import { FindParams } from "../../../../types/common"
import { defaultAdminProductCategoryRelations } from "."

/**
 * @oas [get] /admin/product-categories/{id}
 * operationId: "GetProductCategoriesCategory"
 * summary: "Get a Product Category"
 * description: "Retrieve a Product Category's details."
 * x-authenticated: true
 * x-featureFlag: "product_categories"
 * parameters:
 *   - (path) id=* {string} The ID of the Product Category
 *   - (query) expand {string} Comma-separated relations that should be expanded in the returned product category.
 *   - (query) fields {string} Comma-separated fields that should be included in the returned product category.
 * x-codegen:
 *   method: retrieve
 *   queryParams: AdminGetProductCategoryParams
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Ninja from "@ninjajs/ninja-js"
 *       const ninja = new Ninja({ baseUrl: NINJA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       ninja.admin.productCategories.retrieve(productCategoryId)
 *       .then(({ product_category }) => {
 *         console.log(product_category.id);
 *       })
 *   - lang: tsx
 *     label: Ninja React
 *     source: |
 *       import React from "react"
 *       import { useAdminProductCategory } from "ninja-react"
 *
 *       type Props = {
 *         productCategoryId: string
 *       }
 *
 *       const Category = ({
 *         productCategoryId
 *       }: Props) => {
 *         const {
 *           product_category,
 *           isLoading,
 *         } = useAdminProductCategory(productCategoryId)
 *
 *         return (
 *           <div>
 *             {isLoading && <span>Loading...</span>}
 *             {product_category && (
 *               <span>{product_category.name}</span>
 *             )}
 *
 *           </div>
 *         )
 *       }
 *
 *       export default Category
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/product-categories/{id}' \
 *       -H 'x-ninja-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Product Categories
 * responses:
 *  "200":
 *    description: OK
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/AdminProductCategoriesCategoryRes"
 *  "400":
 *    $ref: "#/components/responses/400_error"
 *  "401":
 *    $ref: "#/components/responses/unauthorized"
 *  "404":
 *    $ref: "#/components/responses/not_found_error"
 *  "409":
 *    $ref: "#/components/responses/invalid_state_error"
 *  "422":
 *    $ref: "#/components/responses/invalid_request_error"
 *  "500":
 *    $ref: "#/components/responses/500_error"
 */
export default async (req: Request, res: Response) => {
  const { id } = req.params

  const productCategoryService: ProductCategoryService = req.scope.resolve(
    "productCategoryService"
  )

  const productCategory = await productCategoryService.retrieve(id, {
    relations: defaultAdminProductCategoryRelations,
  })

  res.status(200).json({ product_category: productCategory })
}

export class AdminGetProductCategoryParams extends FindParams {}
