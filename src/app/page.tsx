"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useMicroCms } from "./_hooks/useMicroCms"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div>initializing...</div>,
})

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string | undefined>()
  const { data, sendMessage } = useMicroCms<string | undefined>()

  useEffect(() => {
    if (!markdown) {
      setMarkdown(data)
    }
  }, [data, markdown])

  return (
    <div data-color-mode="light">
      <MDEditor
        value={markdown}
        onChange={(value) => {
          setMarkdown(value)
          sendMessage({
            data: value,
          })
        }}
        height={540}
        textareaProps={{
          placeholder: "Please enter Markdown text",
        }}
      />
    </div>
  )
}

export default MarkdownEditor
