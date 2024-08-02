import fs from "fs-extra"
import path from "path"

export function resolveAdminCLI() {
  const cli = path.resolve(
    require.resolve("@ninjajs/admin"),
    "../../",
    "bin",
    "ninja-admin.js"
  )

  const binExists = fs.existsSync(cli)

  return {
    binExists,
    cli,
  }
}
