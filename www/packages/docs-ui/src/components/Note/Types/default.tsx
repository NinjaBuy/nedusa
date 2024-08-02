import React from "react"
import { NoteProps } from ".."
import { NoteLayout } from "../Layout"
import { InformationCircleSolid } from "@ninjajs/icons"
import clsx from "clsx"

export const DefaultNote = ({ title = "Note", icon, ...props }: NoteProps) => {
  return (
    <NoteLayout
      title={title}
      icon={
        icon || (
          <InformationCircleSolid
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
