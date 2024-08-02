import { PencilSquare, Trash } from "@ninjajs/icons"
import { PriceListDTO } from "@ninjajs/types"
import { usePrompt } from "@ninjajs/ui"
import { useTranslation } from "react-i18next"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { useDeletePriceList } from "../../../../../hooks/api/price-lists"

type PricingTableActionsProps = {
  priceList: PriceListDTO
}

export const PricingTableActions = ({
  priceList,
}: PricingTableActionsProps) => {
  const { t } = useTranslation()
  const prompt = usePrompt()

  const { mutateAsync } = useDeletePriceList(priceList.id)

  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("pricing.deletePriceListWarning", {
        name: priceList.title,
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    })

    if (!res) {
      return
    }

    await mutateAsync()
  }

  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              label: t("actions.edit"),
              to: `${priceList.id}/edit`,
              icon: <PencilSquare />,
            },
          ],
        },
        {
          actions: [
            {
              label: t("actions.delete"),
              onClick: handleDelete,
              icon: <Trash />,
            },
          ],
        },
      ]}
    />
  )
}
