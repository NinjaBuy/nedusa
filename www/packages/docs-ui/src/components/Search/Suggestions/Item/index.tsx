import clsx from "clsx"
import React from "react"

export type SearchSuggestionItemType = {
  onClick: () => void
} & React.AllHTMLAttributes<HTMLDivElement>

export const SearchSuggestionItem = ({
  children,
  onClick,
  className,
  ...rest
}: SearchSuggestionItemType) => {
  return (
    <div
      className={clsx(
        "flex items-center",
        "cursor-pointer rounded-docs_sm p-docs_0.5",
        "hover:bg-ninja-bg-base-hover",
        "focus:bg-ninja-bg-base-hover",
        "focus:outline-none last:mb-docs_1",
        "text-ninja-fg-base text-compact-small",
        className
      )}
      onClick={onClick}
      data-hit
      {...rest}
    >
      {children}
    </div>
  )
}
