"use client"

import React from "react"
import clsx from "clsx"
import { CopyButton } from "@/components"

export type InlineCodeProps = React.ComponentProps<"code">

export const InlineCode = (props: InlineCodeProps) => {
  return (
    <CopyButton
      text={props.children as string}
      buttonClassName={clsx(
        "bg-transparent border-0 p-0 inline text-ninja-fg-subtle group",
        "font-monospace"
      )}
    >
      <code
        {...props}
        className={clsx(
          "border-ninja-tag-neutral-border border",
          "text-ninja-tag-neutral-text",
          "bg-ninja-tag-neutral-bg font-monospace text-code-label rounded-docs_sm py-0 px-[6px]",
          "group-active:bg-ninja-bg-subtle-pressed group-focus:bg-ninja-bg-subtle-pressed",
          "group-hover:bg-ninja-tag-neutral-bg-hover",
          props.className
        )}
      />
    </CopyButton>
  )
}
