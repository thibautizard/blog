import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";

import "./post.css";
import type { Metadata } from "next";
import Link from "next/link";

// Disable dynamic params to avoid re-rendering the page for each request
export const dynamicParams = false;

// Generate static params to avoid re-rendering the page for each request
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/markdown/${slug}/${slug}.mdx`);
  const title = `${metadata.title} - Thibaut Izard`;

  return {
    description: metadata.excerpt,
    openGraph: {
      description: metadata.excerpt,
      publishedTime: metadata.date,
      title,
      type: "article",
    },
    title,
  };
}

export default async function PostView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(
    `@/markdown/${slug}/${slug}.mdx`
  );

  const formattedDate = formatDateForPost(metadata.date);
  return (
    <div className="post-container">
      <h2 className="font-regular text-zinc-400">
        <Link href="/posts">/ Articles</Link>
      </h2>
      <header className="mb-4 flex flex-col gap-2">
        <h2 className="text-balance font-bold text-3xl">{metadata.title}</h2>
        {formattedDate && (
          <div className="text-gray-500 text-sm">{formattedDate}</div>
        )}
      </header>
      <Post {...metadata} />
    </div>
  );
}
