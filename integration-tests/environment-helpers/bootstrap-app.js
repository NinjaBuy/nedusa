const path = require("path")
const express = require("express")
const getPort = require("get-port")
const { isObject } = require("@ninjajs/utils")
const { setContainer } = require("./use-container")
const { setPort, setExpressServer } = require("./use-api")

async function bootstrapApp({ cwd, env = {} } = {}) {
  const app = express()

  if (isObject(env)) {
    Object.entries(env).forEach(([k, v]) => (process.env[k] = v))
  }

  const loaders = require("@ninjajs/ninja/dist/loaders").default

  const { container, shutdown } = await loaders({
    directory: path.resolve(cwd || process.cwd()),
    expressApp: app,
    isTest: false,
  })

  const PORT = await getPort()

  return {
    shutdown,
    container,
    app,
    port: PORT,
  }
}

module.exports = {
  bootstrapApp,
  startBootstrapApp: async ({
    cwd,
    env = {},
    skipExpressListen = false,
  } = {}) => {
    const {
      app,
      port,
      container,
      shutdown: ninjaShutdown,
    } = await bootstrapApp({
      cwd,
      env,
    })
    let expressServer

    setContainer(container)

    if (skipExpressListen) {
      return
    }

    const shutdown = async () => {
      await Promise.all([expressServer.close(), ninjaShutdown()])

      if (typeof global !== "undefined" && global?.gc) {
        global.gc()
      }
    }

    return await new Promise((resolve, reject) => {
      expressServer = app.listen(port, async (err) => {
        if (err) {
          await shutdown()
          return reject(err)
        }
        setPort(port)
        process.send(port)
        resolve(shutdown)
      })

      setExpressServer(expressServer)
    })
  },
}
