import clsx from "clsx"
import React from "react"

export type ButtonVariants = "primary" | "secondary" | "clear"

export type ButtonType = "default" | "icon"

export type ButtonProps = {
  isSelected?: boolean
  disabled?: boolean
  variant?: ButtonVariants
  className?: string
  buttonType?: ButtonType
  buttonRef?: React.LegacyRef<HTMLButtonElement>
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({
  className,
  children,
  variant = "primary",
  buttonType = "default",
  buttonRef,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: [
      "py-[5px] px-docs_0.75 rounded-docs_sm cursor-pointer",
      "bg-button-inverted bg-ninja-button-inverted dark:bg-button-inverted-dark",
      "hover:bg-ninja-button-inverted-hover hover:bg-no-image hover:no-underline",
      "active:bg-ninja-button-inverted-pressed active:bg-no-image",
      "focus:bg-ninja-button-inverted-pressed focus:bg-no-image",
      "shadow-button-colored active:shadow-button-colored-focused focus:shadow-button-colored-focused transition-shadow",
      "dark:shadow-button-colored-dark dark:active:shadow-button-colored-focused-dark dark:focus:shadow-button-colored-focused-dark",
      "disabled:!bg-no-image disabled:bg-ninja-bg-disabled",
      "disabled:cursor-not-allowed disabled:border-ninja-border-base",
      "text-compact-small-plus text-ninja-fg-on-inverted",
      "[&_a]:text-ninja-fg-on-inverted",
      "disabled:text-ninja-fg-disabled",
      "[&_a]:disabled:text-ninja-fg-disabled",
      "border border-ninja-border-loud",
      "select-none",
    ],
    secondary: [
      "py-[5px] px-docs_0.75 rounded-docs_sm cursor-pointer",
      "bg-button-neutral bg-ninja-button-neutral dark:bg-button-neutral-dark",
      "hover:bg-ninja-button-neutral-hover hover:bg-no-image hover:no-underline",
      "active:bg-ninja-button-neutral-pressed active:bg-no-image",
      "focus:bg-ninja-button-neutral-pressed focus:bg-no-image",
      "disabled:!bg-no-image disabled:bg-ninja-bg-disabled",
      "disabled:cursor-not-allowed",
      "border border-solid border-ninja-border-base",
      "text-compact-small-plus text-ninja-fg-base",
      "[&_a]:text-ninja-fg-base",
      "shadow-button-neutral focus:shadow-button-neutral-focused active:shadow-button-neutral-focused transition-shadow",
      "dark:shadow-button-neutral dark:focus:shadow-button-neutral-focused dark:active:shadow-button-neutral-focused",
      "select-none",
    ],
    clear: [
      "bg-transparent shadow-none border-0 outline-none cursor-pointer text-fg-ninja-subtle",
    ],
  }

  return (
    <button
      className={clsx(
        "inline-flex flex-row justify-center items-center gap-[6px]",
        variant === "primary" && variantClasses.primary,
        variant === "secondary" && variantClasses.secondary,
        variant === "clear" && variantClasses.clear,
        buttonType === "icon" && "!px-docs_0.25",
        className
      )}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  )
}
