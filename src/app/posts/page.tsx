import Link from "next/link";
import { cn } from "src/lib/utils";
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
      {/* 📄📄📄 */}
      <ul className="list-none space-y-7">
        {postsToDisplay.map(({ slug, metadata: { title, excerpt, date } }) => (
          <li
            className="border-gray-100 border-b pb-7 last:border-none last:pb-0"
            key={slug}
          >
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

// 🆎
function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-pretty font-medium text-[1.65rem] leading-none">
      {children}
    </h3>
  );
}

// 📅
function PostDate({
  children,
  dateString,
}: {
  children: React.ReactNode;
  dateString: string;
}) {
  return (
    <time
      className={cn(
        "mt-0.5",
        "font-regular text-gray-500 text-sm",
        "empty:hidden",
        "font-gluten"
      )}
      dateTime={dateString}
    >
      {children}
    </time>
  );
}

function PostExcerpt({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-black">{children}</p>;
}
