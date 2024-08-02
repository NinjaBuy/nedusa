import { NinjaContainer } from "@ninjajs/types"

interface SubscriberContext extends Record<string, unknown> {
  subscriberId?: string
}

export type SubscriberConfig = {
  event: string | string[]
  context?: SubscriberContext
}

export type SubscriberArgs<T = unknown> = {
  data: T
  eventName: string
  container: NinjaContainer
  pluginOptions: Record<string, unknown>
}
