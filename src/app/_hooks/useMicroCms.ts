import { useCallback, useEffect, useState } from "react"

type Message<T> = {
  id?: string
  title?: string
  description?: string
  imageUrl?: URL
  updatedAt?: string
  data: T
}

type UseMicroCmsReturns<T> = {
  iframeId: string
  data: T | undefined
  message: Message<T> | undefined
  sendMessage: (message: Message<T>) => void
}

const origin = process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || ""

export const useMicroCms = <T>(): UseMicroCmsReturns<T> => {
  const [iframeId, setIframeId] = useState<string>("")
  const [message, setMessage] = useState<Message<T> | undefined>()
  const data = message?.data

  const listener = useCallback((event: MessageEvent) => {
    if (!event.isTrusted) return
    if (event.data.action === "MICROCMS_GET_DEFAULT_DATA") {
      setIframeId(event.data.id)
      if (event.data.message) {
        setMessage(event.data.message)
      }
    }
  }, [])

  const setInitialIframeStyle = useCallback(() => {
    window.parent.postMessage(
      {
        id: iframeId,
        action: "MICROCMS_UPDATE_STYLE",
        message: {
          height: 540,
          width: "100%",
        },
      },
      origin,
    )
  }, [iframeId])

  useEffect(() => {
    setInitialIframeStyle()
    window.addEventListener("message", listener)
    return () => {
      window.removeEventListener("message", listener)
    }
  }, [setInitialIframeStyle, listener])

  const sendMessage = useCallback(
    (message: Message<T>) => {
      setMessage(message)
      window.parent.postMessage(
        {
          id: iframeId,
          action: "MICROCMS_POST_DATA",
          message: {
            updatedAt: new Date().toISOString(),
            ...message,
          },
        },
        origin,
      )
    },
    [iframeId],
  )

  return { iframeId, data, message, sendMessage }
}
