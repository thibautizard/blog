import fs from "node:fs";
import path from "node:path";
import type { Post, PostMetadata, PostResume } from "@/types/posts";

const startDir = path.join(process.cwd(), "src", "markdown");

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

export function sortPostsByDate(post1: Post, post2: Post): number {
  const date1 = new Date(post1.metadata.date);
  const date2 = new Date(post2.metadata.date);
  return date2.getTime() - date1.getTime();
}

export async function getSortedPostsWithMetadata(): Promise<Post[]> {
  const posts = await Promise.all(
    getAllPosts().map(async (post) => {
      const { metadata } = (await import(
        `@/markdown/${post.slug}/${post.slug}.mdx`
      )) as { metadata: PostMetadata };
      return { ...post, metadata };
    })
  );

  return posts.sort(sortPostsByDate);
}
