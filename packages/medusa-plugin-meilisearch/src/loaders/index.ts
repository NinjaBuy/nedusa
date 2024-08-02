import { NinjaContainer } from "@ninjajs/modules-sdk"
import { Logger } from "@ninjajs/types"
import MeiliSearchService from "../services/meilisearch"
import { MeilisearchPluginOptions } from "../types"

export default async (
  container: NinjaContainer,
  options: MeilisearchPluginOptions
) => {
  const logger: Logger = container.resolve("logger")

  try {
    const meilisearchService: MeiliSearchService =
      container.resolve("meilisearchService")

    const { settings } = options

    await Promise.all(
      Object.entries(settings || {}).map(async ([indexName, value]) => {
        return await meilisearchService.updateSettings(indexName, value)
      })
    )
  } catch (err) {
    // ignore
    logger.warn(err)
  }
}
