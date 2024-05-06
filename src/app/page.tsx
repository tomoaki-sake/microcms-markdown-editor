"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useMicroCms } from "./_hooks/useMicroCms"
import { request } from "@/utils/internal-api"
import type { CreateMarkdownRequest } from "@/types/api/create-markdown"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div>initializing...</div>,
})

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string | undefined>()
  const [filename, setFilename] = useState<string>("")
  const { data, message, sendMessage } = useMicroCms<string | undefined>()

  const createMarkdownRequest = async () => {
    await request<CreateMarkdownRequest>({
      url: "/api/markdown",
      method: "POST",
      body: {
        filename: filename,
        markdown: markdown,
      },
    })
  }

  useEffect(() => {
    if (!markdown) {
      setMarkdown(data)
    }
    if (!filename && message?.title) {
      setFilename(message?.title)
    }
  }, [data, markdown, message, filename])

  const handleInput = (title: string, markdown: string | undefined) => {
    setFilename(title)
    setMarkdown(markdown)
    sendMessage({
      title: title,
      data: markdown,
    })
  }

  return (
    <div data-color-mode="light">
      <label>Filename:</label>
      <input
        type="text"
        value={filename}
        onChange={(e) => handleInput(e.target.value, markdown)}
      />
      <MDEditor
        value={markdown}
        onChange={(value) => handleInput(filename, value)}
        height={540}
        textareaProps={{
          placeholder: "Please enter Markdown text",
        }}
      />
      <button type="button" onClick={createMarkdownRequest}>
        Save
      </button>
    </div>
  )
}

export default MarkdownEditor
