import React from "react"
import clsx from "clsx"

export type TextAreaProps = {
  className?: string
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className={clsx(
        "bg-ninja-bg-field shadow-button-secondary dark:shadow-button-secondary-dark",
        "border-ninja-border-base rounded-docs_sm border border-solid",
        "pt-docs_0.4 px-docs_0.75 text-medium font-base pb-[9px]",
        "hover:bg-ninja-bg-field-hover",
        "focus:border-ninja-border-interactive",
        "active:border-ninja-border-interactive",
        "disabled:bg-ninja-bg-disabled",
        "disabled:border-ninja-border-base",
        "placeholder:text-ninja-fg-muted",
        "disabled:placeholder:text-ninja-fg-disabled",
        props.className
      )}
    />
  )
}
