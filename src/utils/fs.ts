import fs from "node:fs"
import { join } from "node:path"

const postsDirectory = join(process.cwd(), "src/posts")
export const createMarkdown = (filename: string, markdown: string): boolean => {
  const dirPath = `${postsDirectory}/${filename}`
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`Directory ${dirPath} created.`)
  }

  try {
    fs.writeFileSync(`${dirPath}/${filename}.md`, markdown)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
