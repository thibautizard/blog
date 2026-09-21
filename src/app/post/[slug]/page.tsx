import Image from "next/image";
import { PageFade } from "@/components/page-fade";
import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";
import "./_style/post.css";
import type { Metadata } from "next";
import { PostSummary } from "./_components/post-summary";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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

  const { date: dateString, title, illustration } = metadata;
  return (
    <PageFade>
      <PostSummary />
      <div className="post-container">
        {/* 🆎📅 🖼️ */}
        <header className="mb-4 flex items-center justify-between gap-x-6">
          {/* 🆎📅 */}
          <div>
            {/* 🆎 */}
            <PostTitle>{title}</PostTitle>
            {/* 📅 */}
            <PostDate dateString={dateString} />
          </div>
          {/* 🖼️ */}
          <PostIllustration illustration={illustration} />
        </header>
        {/* ✍️ */}
        <Post {...metadata} />
      </div>
    </PageFade>
  );
}

// 🆎
function PostTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="post-title">{children}</h1>;
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

// 🖼️
function PostIllustration({ illustration }: { illustration?: string }) {
  if (!illustration) return null;
  return (
    <Image
      alt=""
      className="hidden size-[60px] shrink-0 object-contain sm:block"
      height={60}
      src={`/assets/${illustration}`}
      width={60}
    />
  );
}

// 💻
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
