import { ExclamationCircleSolid } from "@ninjajs/icons"
import clsx from "clsx"
import React from "react"

export const SearchNoResult = () => {
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-docs_1",
        "text-ninja-fg-muted"
      )}
    >
      <ExclamationCircleSolid />
      <span className="text-compact-small">
        No results found. Try changing selected filters.
      </span>
    </div>
  )
}
