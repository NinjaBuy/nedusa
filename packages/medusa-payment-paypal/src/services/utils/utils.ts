import { zeroDecimalCurrencies } from "ninja-core-utils";

export function roundToTwo(num: number, currency: string): string {
  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return `${num}`
  }
  return num.toFixed(2)
}