"use client"

import React from "react"
import clsx from "clsx"
import { Link, LinkProps } from "@/components"

export type NavbarLinkProps = {
  href: string
  label: string
  className?: string
  activeValuePattern?: RegExp
  isActive?: boolean
} & LinkProps

export const NavbarLink = ({
  href,
  label,
  className,
  isActive,
}: NavbarLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        isActive && "!text-ninja-fg-base",
        !isActive && "!text-ninja-fg-subtle",
        "text-compact-small-plus inline-block",
        "hover:!text-ninja-fg-base",
        className
      )}
    >
      {label}
    </Link>
  )
}
