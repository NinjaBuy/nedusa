import React from "react"
import clsx from "clsx"

export type BadgeVariant =
  | "purple"
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "neutral"

export type BadgeProps = {
  className?: string
  variant: BadgeVariant
} & React.HTMLAttributes<HTMLSpanElement>

export const Badge = ({ className, variant, children }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "text-compact-x-small-plus px-docs_0.25 py-0 rounded-docs_sm border border-solid text-center",
        variant === "purple" &&
          "bg-ninja-tag-purple-bg text-ninja-tag-purple-text border-ninja-tag-purple-border",
        variant === "orange" &&
          "bg-ninja-tag-orange-bg text-ninja-tag-orange-text border-ninja-tag-orange-border",
        variant === "green" &&
          "bg-ninja-tag-green-bg text-ninja-tag-green-text border-ninja-tag-green-border",
        variant === "blue" &&
          "bg-ninja-tag-blue-bg text-ninja-tag-blue-text border-ninja-tag-blue-border",
        variant === "red" &&
          "bg-ninja-tag-red-bg text-ninja-tag-red-text border-ninja-tag-red-border",
        variant === "neutral" &&
          "bg-ninja-tag-neutral-bg text-ninja-tag-neutral-text border-ninja-tag-neutral-border",
        "badge",
        className
      )}
    >
      {children}
    </span>
  )
}
