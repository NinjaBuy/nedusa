import React from "react"
import { NotificationItemProps } from "../.."
import clsx from "clsx"
import {
  CheckCircleSolid,
  ExclamationCircleSolid,
  InformationCircleSolid,
  XCircleSolid,
} from "@ninjajs/icons"
import { Button } from "@/components"

export type NotificationItemLayoutDefaultProps = NotificationItemProps & {
  handleClose: () => void
  closeButtonText?: string
}

export const NotificationItemLayoutDefault: React.FC<
  NotificationItemLayoutDefaultProps
> = ({
  type = "info",
  title = "",
  text = "",
  children,
  isClosable = true,
  handleClose,
  CustomIcon,
  closeButtonText = "Close",
}) => {
  return (
    <div className="bg-ninja-bg-base w-full h-full shadow-flyout dark:shadow-flyout-dark rounded-docs_DEFAULT">
      <div className={clsx("flex gap-docs_1 p-docs_1")}>
        {type !== "none" && (
          <div
            className={clsx(
              type !== "custom" && "w-docs_2 flex justify-center items-center"
            )}
          >
            {type === "info" && (
              <InformationCircleSolid className="text-ninja-tag-blue-icon" />
            )}
            {type === "error" && (
              <XCircleSolid className="text-ninja-tag-red-icon" />
            )}
            {type === "warning" && (
              <ExclamationCircleSolid className="text-ninja-tag-orange-icon" />
            )}
            {type === "success" && (
              <CheckCircleSolid className="text-ninja-tag-green-icon" />
            )}
            {type === "custom" && CustomIcon}
          </div>
        )}
        <span
          className={clsx("text-compact-medium-plus", "text-ninja-fg-base")}
        >
          {title}
        </span>
      </div>
      {(text || children) && (
        <div
          className={clsx(
            "flex pt-0 pr-docs_1 pb-docs_1.5 pl-docs_1 gap-docs_1",
            "border-0 border-b border-solid border-ninja-border-base"
          )}
        >
          <div className="w-docs_2 flex-none"></div>
          <div className={clsx("flex flex-col", children && "gap-docs_1")}>
            {text && (
              <span className={clsx("text-medium text-ninja-fg-subtle")}>
                {text}
              </span>
            )}
            {children}
          </div>
        </div>
      )}
      {isClosable && (
        <div className={clsx("p-docs_1 flex justify-end items-center")}>
          <Button onClick={handleClose}>{closeButtonText}</Button>
        </div>
      )}
    </div>
  )
}
