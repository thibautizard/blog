import fs from "node:fs";
import path from "node:path";

export async function getAllPosts() {
  const postsDir = path.join(process.cwd(), "src", "markdown");

  let folders = await fs.promises.readdir(postsDir);
  folders = folders.filter((folder) => !folder.startsWith("."));

  const posts = [];
  for (const folder of folders) {
    const folderPath = path.join(postsDir, folder);
    const files = await fs.promises.readdir(folderPath);
    for (const file of files) {
      if (file.endsWith(".mdx")) {
        posts.push({ slug: file.replace(".mdx", "") });
      }
    }
  }
  return posts;
}
