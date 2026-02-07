import fs from "node:fs";
import path from "node:path";

const startDir = path.join(process.cwd(), "src", "markdown");

export interface PostResume {
  slug: string;
  path: string;
}

const markdownFileRegex = /\.mdx$/;
const markdownDirRegex = /^.*markdown\//;

export function getAllPosts(dir: string = startDir): PostResume[] {
  let posts: PostResume[] = [];
  const dirEntries = fs.readdirSync(dir);

  for (const element of dirEntries) {
    const elementPath = path.join(dir, element);
    const isHiddenOrDash = element.startsWith(".") || element.startsWith("-");
    const isDirectory = fs.statSync(elementPath).isDirectory();

    if (markdownFileRegex.test(element)) {
      posts.push({
        path: elementPath.replace(markdownDirRegex, ""),
        slug: element.replace(markdownFileRegex, ""),
      });
    }

    if (!isHiddenOrDash && isDirectory) {
      const subPosts = getAllPosts(elementPath);
      posts = [...posts, ...subPosts];
    }
  }

  return posts;
}
