import { SparklesSolid } from "@ninjajs/icons"
import clsx from "clsx"
import React from "react"

export type AiAssistantCommandIconProps =
  React.AllHTMLAttributes<HTMLSpanElement>

export const AiAssistantCommandIcon = ({
  className,
  ...props
}: AiAssistantCommandIconProps) => {
  return (
    <span
      className={clsx(
        "bg-button-inverted bg-ninja-button-inverted dark:bg-button-inverted-dark",
        "rounded-md p-[2px] text-ninja-fg-on-inverted flex",
        className
      )}
      {...props}
    >
      <SparklesSolid />
    </span>
  )
}
