import React from "react"
import { NoteProps } from ".."
import { NoteLayout } from "../Layout"
import { XMark } from "@ninjajs/icons"
import clsx from "clsx"

export const ErrorNote = ({ title = "Error", icon, ...props }: NoteProps) => {
  return (
    <NoteLayout
      title={title}
      icon={
        icon || (
          <XMark
            className={clsx(
              "inline-block mr-docs_0.125 text-ninja-tag-red-icon"
            )}
          />
        )
      }
      {...props}
    />
  )
}
