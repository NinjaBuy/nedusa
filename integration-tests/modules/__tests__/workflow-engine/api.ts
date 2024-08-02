import { workflowEngineTestSuite } from "./tests"

jest.setTimeout(5000000)

const env = {
  NINJA_FF_NINJA_V2: false,
}

workflowEngineTestSuite(env, { force_modules_migration: true })
