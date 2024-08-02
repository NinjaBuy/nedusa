import React from "react"
import clsx from "clsx"

export type LegacyLinkProps = {
  href?: string
  children?: React.ReactNode
  className?: string
} & React.AllHTMLAttributes<HTMLAnchorElement>

export const LegacyLink = ({
  href,
  children,
  className,
  ...rest
}: LegacyLinkProps) => {
  return (
    <a
      href={href || ""}
      {...rest}
      className={clsx(
        "text-ninja-fg-interactive hover:text-ninja-fg-interactive-hover",
        className
      )}
    >
      {children}
    </a>
  )
}
