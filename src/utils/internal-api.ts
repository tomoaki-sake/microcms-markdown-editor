type Method = "GET" | "POST" | "PUT" | "DELETE"
type RequestArgs<T> = {
  url: string
  method: Method
  params?: { [key: string]: string }
  body?: T
}
export const request = async <T>({url, method, params, body }: RequestArgs<T>): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
  }
  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }
  const requestBody = body ? JSON.stringify(body) : undefined
  return await fetch(url, {
    method: method,
    headers: headers,
    body: requestBody,
  })
}
