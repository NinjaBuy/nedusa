import React from "react"
import { NoteProps } from ".."
import clsx from "clsx"

type NoteLayoutProps = NoteProps & {
  icon: React.ReactNode
}

export const NoteLayout = ({
  type,
  title,
  children,
  icon,
}: NoteLayoutProps) => {
  const isDefaultStyle =
    type === "default" ||
    type === "success" ||
    type === "error" ||
    type === "check"
  const isWarningStyle = type === "warning"

  return (
    <div
      className={clsx(
        "p-docs_1 border border-solid  rounded shadow-none",
        isDefaultStyle &&
          "bg-ninja-tag-neutral-bg border-ninja-tag-neutral-border",
        isWarningStyle && "bg-ninja-tag-red-bg border-ninja-tag-red-border",
        "[&_a]:no-underline [&_a]:text-ninja-fg-interactive hover:[&_a]:text-ninja-fg-interactive-hover ",
        "mb-docs_2 alert"
      )}
    >
      <div className={clsx("flex")}>
        <span className={clsx("inline-block h-1.5 w-1.5 mr-1")}>{icon}</span>
        <div
          className={clsx(
            isDefaultStyle && "text-ninja-tag-neutral-text",
            isWarningStyle && "text-ninja-tag-red-text",
            "text-medium flex-1 [&>*:last-child]:mb-0",
            "[&>p>code]:px-docs_0.5 [&>p>code]:text-code-label"
          )}
        >
          {title && (
            <span
              className={clsx(
                "text-compact-medium-plus block mb-docs_0.125",
                isDefaultStyle && "text-ninja-fg-base",
                isWarningStyle && "text-ninja-tag-red-text"
              )}
            >
              {title}
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
