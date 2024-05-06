import { createMarkdown } from "@/utils/fs"

export const dynamic = 'force-dynamic'
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  return Response.json({ message: `GET: ${query}` })
}

export const POST = async (request: Request) => {
  const body = await request.json()
  const result = createMarkdown(body.filename, body.markdown)
  const responseBody = result ? 'success' : 'failed'
  const status = result ? 200 : 500
  return new Response(responseBody, { status })
}
