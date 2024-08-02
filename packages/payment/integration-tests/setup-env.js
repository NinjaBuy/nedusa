if (typeof process.env.DB_TEMP_NAME === "undefined") {
  const tempName = parseInt(process.env.JEST_WORKER_ID || "1")
  process.env.DB_TEMP_NAME = `ninja-payment-integration-${tempName}`
}

process.env.NINJA_PAYMENT_DB_SCHEMA = "public"
