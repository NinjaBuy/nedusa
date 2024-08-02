import React from "react"
import clsx from "clsx"

export type InputTextProps = {
  className?: string
  addGroupStyling?: boolean
  passedRef?: React.Ref<HTMLInputElement>
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputText = ({
  addGroupStyling = false,
  className,
  passedRef,
  ...props
}: InputTextProps) => {
  return (
    <input
      {...props}
      className={clsx(
        "bg-ninja-bg-field shadow-button-secondary dark:shadow-button-secondary-dark",
        "border-ninja-border-base rounded-docs_sm border border-solid",
        "px-docs_0.75 py-[9px]",
        "hover:bg-ninja-bg-field-hover",
        addGroupStyling && "group-hover:bg-ninja-bg-field-hover",
        "focus:border-ninja-border-interactive",
        "active:border-ninja-border-interactive",
        "disabled:bg-ninja-bg-disabled",
        "disabled:border-ninja-border-base",
        "placeholder:text-ninja-fg-muted",
        "disabled:placeholder:text-ninja-fg-disabled",
        "text-compact-medium font-base",
        className
      )}
      ref={passedRef}
    />
  )
}
