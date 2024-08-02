import clsx from "clsx"
import React from "react"
import { ThreadType } from ".."
import { DotsLoading, MarkdownContent, QuestionMarkIcon } from "@/components"
import { ExclamationCircle, Sparkles } from "@ninjajs/icons"
import { AiAssistantThreadItemActions } from "./Actions"

export type AiAssistantThreadItemProps = {
  item: ThreadType
}

export const AiAssistantThreadItem = ({ item }: AiAssistantThreadItemProps) => {
  return (
    <div
      className={clsx(
        "p-docs_1 flex justify-start gap-docs_1 items-start",
        "text-ninja-fg-subtle border-solid border-0 border-b",
        "border-ninja-border-base text-medium relative",
        item.type === "question" && "bg-ninja-bg-base",
        item.type === "answer" && "bg-ninja-bg-subtle"
      )}
    >
      <span
        className={clsx(
          "border border-solid border-ninja-border-base",
          "rounded-docs_sm p-docs_0.125 bg-ninja-bg-component",
          "text-ninja-fg-muted flex"
        )}
      >
        {item.type === "question" && <QuestionMarkIcon />}
        {item.type === "answer" && <Sparkles />}
        {item.type === "error" && <ExclamationCircle />}
      </span>
      <div className="md:max-w-[calc(100%-134px)] md:w-[calc(100%-134px)]">
        {item.type === "question" && <>{item.content}</>}
        {item.type === "answer" && (
          <>
            {!item.question_id && item.content.length === 0 && <DotsLoading />}
            <MarkdownContent>{item.content}</MarkdownContent>
          </>
        )}
        {item.type === "error" && (
          <span className="text-ninja-fg-error">{item.content}</span>
        )}
      </div>
      {item.type === "answer" && item.question_id && (
        <AiAssistantThreadItemActions item={item} />
      )}
    </div>
  )
}
