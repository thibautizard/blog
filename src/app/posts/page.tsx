import { CalendarFoldIcon } from "lucide-react";
import Link from "next/link";
import { formatDateForPost } from "@/lib/dates";
import { getAllPosts, sortPostsByDate } from "@/lib/posts";
import type { PostMetadata } from "@/types/posts";

export default async function HomePage() {
  const posts = getAllPosts();
  const postsWithMetadata = await Promise.all(
    posts.map(async (post) => {
      const { metadata } = (await import(
        `@/markdown/${post.slug}/${post.slug}.mdx`
      )) as { metadata: PostMetadata };
      return { ...post, metadata };
    })
  );

  const postsToDisplay = postsWithMetadata.sort(sortPostsByDate);

  return (
    <div>
      {/* 🆎 */}
      <h2 className="mb-6 font-bold text-5xl">Articles</h2>
      {/* 📄📄📄 */}
      <ul className="list-none space-y-12">
        {postsToDisplay.map(({ slug, metadata: { title, excerpt, date } }) => (
          <li key={slug}>
            <Link href={`/post/${slug}`}>
              <article>
                {/* 🆎📅 */}
                <header className="mb-2">
                  {/* 🆎 */}
                  <PostTitle>{title}</PostTitle>
                  {/* 📅 */}
                  <PostDate dateString={date}>
                    {formatDateForPost(date)}
                  </PostDate>
                </header>
                {/* 🔡 */}
                <PostExcerpt>{excerpt}</PostExcerpt>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-1 max-w-150 text-pretty font-bold text-2xl">
      {children}
    </h3>
  );
}

function PostDate({
  children,
  dateString,
}: {
  children: React.ReactNode;
  dateString: string;
}) {
  return (
    <div className="flex items-center text-slate-400 text-sm capitalize empty:hidden">
      <CalendarFoldIcon className="mr-1.5 inline-block" size={14} />
      <time dateTime={dateString}>{children}</time>
    </div>
  );
}

function PostExcerpt({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-slate-500">{children}</p>;
}
