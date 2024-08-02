import { Heading } from "@ninjajs/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { RouteDrawer } from "../../../components/route-modal"
import { EditProductForm } from "./components/edit-product-form"
import { useProduct } from "../../../hooks/api/products"

export const ProductEdit = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const { product, isLoading, isError, error } = useProduct(id!)

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("products.editProduct")}</Heading>
      </RouteDrawer.Header>
      {!isLoading && product && <EditProductForm product={product} />}
    </RouteDrawer>
  )
}
