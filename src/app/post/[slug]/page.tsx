import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";

import "./post.css";
import type { Metadata } from "next";

// Disable dynamic params to avoid re-rendering the page for each request
export const dynamicParams = false;

// Generate static params to avoid re-rendering the page for each request
export async function generateStaticParams() {
  const posts = getAllPosts();
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
  const { date: dateString, title } = metadata;
  return (
    <div className="post-container">
      {/* 🆎📅 */}
      <header className="mb-4">
        {/* 🆎 */}
        <PostTitle>{title}</PostTitle>
        {/* 📅 */}
        <PostDate dateString={dateString} />
      </header>
      {/* ✍️ */}
      <Post {...metadata} />
    </div>
  );
}

// 🆎
function PostTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="post-title">{children}</h2>;
}

// 📅
function PostDate({ dateString }: { dateString: string }) {
  const formattedDate = formatDateForPost(dateString);
  return (
    <time className="post-date" dateTime={dateString}>
      {formattedDate}
    </time>
  );
}
