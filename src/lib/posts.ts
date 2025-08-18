import fs from "node:fs";
import path from "node:path";

const startDir = path.join(process.cwd(), "src", "markdown");

export interface PostResume {
  slug: string;
  path: string;
}

export function getAllPosts(dir: string = startDir): PostResume[] {
  let posts: PostResume[] = [];

  fs.readdirSync(dir)
    .filter((element) => {
      const elementPath = path.join(dir, element);
      const isWorthInspecting =
        !element.startsWith(".") &&
        !element.startsWith("-") &&
        fs.statSync(elementPath).isDirectory();
      const isMarkdownFile = element.endsWith(".mdx");
      if (isMarkdownFile)
        posts.push({
          slug: element.replace(".mdx", ""),
          path: elementPath.replace(/^.*markdown\//, ""),
        });
      return isWorthInspecting;
    })
    .forEach((folder) => {
      const folderPath = path.join(dir, folder);
      posts = [...posts, ...getAllPosts(folderPath)];
    });

  return posts;
}
