"use client"

import React, { useMemo } from "react"
import clsx from "clsx"
import { CodeBlockStyle } from ".."
import { useColorMode } from "@/providers"
import { Badge, BadgeVariant } from "@/components"

export type CodeBlockHeaderMeta = {
  badgeLabel?: string
  badgeColor?: BadgeVariant
}

type CodeBlockHeaderProps = {
  children?: React.ReactNode
  title?: string
  blockStyle?: CodeBlockStyle
} & CodeBlockHeaderMeta

export const CodeBlockHeader = ({
  children,
  title,
  blockStyle = "loud",
  badgeLabel,
  badgeColor,
}: CodeBlockHeaderProps) => {
  const { colorMode } = useColorMode()

  const borderColor = useMemo(
    () =>
      clsx(
        blockStyle === "loud" && [
          colorMode === "light" && "border-ninja-code-border",
          colorMode === "dark" && "border-ninja-border-base",
        ],
        blockStyle === "subtle" && [
          colorMode === "light" && "border-ninja-border-base",
          colorMode === "dark" && "border-ninja-code-border",
        ]
      ),
    [blockStyle, colorMode]
  )
  return (
    <div
      className={clsx(
        "py-docs_0.75 rounded-t-docs_DEFAULT px-docs_1 mb-0",
        "flex gap-docs_2 items-start justify-between",
        blockStyle === "loud" && [
          colorMode === "light" && "bg-ninja-code-bg-header",
          colorMode === "dark" && "bg-ninja-bg-base",
        ],
        blockStyle === "subtle" && [
          colorMode === "light" && "bg-ninja-bg-component",
          colorMode === "dark" && "bg-ninja-code-bg-header",
        ],
        borderColor && `border border-b-0 ${borderColor}`
      )}
    >
      {children}
      {title && (
        <div
          className={clsx(
            "txt-compact-small-plus",
            blockStyle === "loud" && [
              colorMode === "light" && "text-ninja-code-text-subtle",
              colorMode === "dark" && "text-ninja-fg-muted",
            ],
            blockStyle === "subtle" && [
              colorMode === "light" && "text-ninja-fg-subtle",
              colorMode === "dark" && "text-ninja-code-text-subtle",
            ]
          )}
        >
          {title}
        </div>
      )}
      {badgeLabel && (
        <Badge variant={badgeColor || "orange"} className="font-base">
          {badgeLabel}
        </Badge>
      )}
    </div>
  )
}
