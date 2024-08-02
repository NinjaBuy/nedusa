import { CurrencyDTO, PaymentProviderDTO, StoreDTO } from "@ninjajs/types"

export type Store = StoreDTO & {
  default_currency: CurrencyDTO | null
  currencies?: CurrencyDTO[]
  payment_providers?: PaymentProviderDTO[]
}
