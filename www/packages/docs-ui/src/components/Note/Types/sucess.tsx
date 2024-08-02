import React from "react"
import { NoteProps } from ".."
import { NoteLayout } from "../Layout"
import { Check } from "@ninjajs/icons"
import clsx from "clsx"

export const SuccessNote = ({
  title = "Sucess",
  icon,
  ...props
}: NoteProps) => {
  return (
    <NoteLayout
      title={title}
      icon={
        icon || (
          <Check
            className={clsx(
              "inline-block mr-docs_0.125 text-ninja-tag-green-icon"
            )}
          />
        )
      }
      {...props}
    />
  )
}
