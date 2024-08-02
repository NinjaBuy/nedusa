export const breaking = (
  v1Fn: (() => any) | null,
  v2Fn?: (() => any) | null
) => {
  if (process.env.NINJA_FF_NINJA_V2 === "true") {
    return v2Fn?.()
  }

  return v1Fn?.()
}
