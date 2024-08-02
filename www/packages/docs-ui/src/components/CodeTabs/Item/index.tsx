"use client"

import React from "react"
import { BaseTabType, useScrollPositionBlocker } from "@/hooks"
import { useColorMode } from "@/providers"
import clsx from "clsx"

type CodeTabProps = BaseTabType & {
  children: React.ReactNode
  isSelected?: boolean
  blockStyle?: string
  changeSelectedTab?: (tab: BaseTabType) => void
  pushRef?: (tabButton: HTMLButtonElement | null) => void
}

export const CodeTab = ({
  label,
  value,
  isSelected = false,
  blockStyle = "loud",
  changeSelectedTab,
  pushRef,
}: CodeTabProps) => {
  const { colorMode } = useColorMode()
  const { blockElementScrollPositionUntilNextRender } =
    useScrollPositionBlocker()

  return (
    <li>
      <button
        className={clsx(
          "text-compact-small-plus xs:border-0 py-docs_0.25 px-docs_0.75 relative rounded-full border",
          !isSelected && [
            "text-ninja-code-text-subtle border-transparent",
            blockStyle === "loud" && [
              colorMode === "light" &&
                "text-ninja-code-text-subtle hover:bg-ninja-code-bg-base",
              colorMode === "dark" &&
                "text-ninja-fg-muted hover:bg-ninja-bg-component",
            ],
            blockStyle === "subtle" && [
              colorMode === "light" &&
                "text-ninja-fg-subtle hover:bg-ninja-bg-base",
              colorMode === "dark" &&
                "text-ninja-code-text-subtle hover:bg-ninja-code-bg-base",
            ],
          ],
          isSelected && [
            "xs:!bg-transparent",
            blockStyle === "loud" && [
              colorMode === "light" &&
                "border-ninja-code-border text-ninja-code-text-base",
              colorMode === "dark" &&
                "border-ninja-border-base text-ninja-fg-base",
            ],
            blockStyle === "subtle" && [
              colorMode === "light" &&
                "xs:border-ninja-border-base text-ninja-code-text-base",
              colorMode === "dark" &&
                "xs:border-ninja-code-border text-ninja-code-text-base",
            ],
          ]
        )}
        ref={(tabButton) => pushRef?.(tabButton)}
        onClick={(e) => {
          blockElementScrollPositionUntilNextRender(
            e.target as HTMLButtonElement
          )
          changeSelectedTab?.({ label, value })
        }}
        aria-selected={isSelected}
        role="tab"
      >
        {label}
      </button>
    </li>
  )
}
