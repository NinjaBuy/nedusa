import { PaymentProviderContext } from "@ninjajs/types"

export class StorePostPaymentCollectionsPaymentSessionReq {
  provider_id: string
  context?: PaymentProviderContext
  data?: Record<string, unknown>
}
