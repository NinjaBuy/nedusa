import { ModuleProviderExports } from "@ninjajs/types"
import { LocalFileService } from "./services/local-file"

const services = [LocalFileService]

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport
