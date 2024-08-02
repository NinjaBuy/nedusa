if (typeof process.env.DB_TEMP_NAME === "undefined") {
  const tempName = parseInt(process.env.JEST_WORKER_ID || "1")
  process.env.DB_TEMP_NAME = `ninja-workflow-engine-inmemory-${tempName}`
}

process.env.NINJA_WORKFLOW_ENGINE_DB_SCHEMA = "public"
