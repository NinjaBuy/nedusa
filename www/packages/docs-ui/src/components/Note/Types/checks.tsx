import React from "react"
import { NoteProps } from ".."
import { NoteLayout } from "../Layout"
import { CheckCircleSolid } from "@ninjajs/icons"
import clsx from "clsx"

export const CheckNote = ({
  title = "Prerequisites",
  icon,
  ...props
}: NoteProps) => {
  return (
    <NoteLayout
      title={title}
      icon={
        icon || (
          <CheckCircleSolid
            className={clsx(
              "inline-block mr-docs_0.125 text-ninja-tag-neutral-icon"
            )}
          />
        )
      }
      {...props}
    />
  )
}
