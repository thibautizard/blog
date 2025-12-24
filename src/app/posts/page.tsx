/** biome-ignore-all lint/suspicious/useAwait: special case */
import { CalendarFoldIcon } from "lucide-react";
import Link from "next/link";
import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = getAllPosts();
  const postsWithMetadata = await Promise.all(
    posts.map(async (post) => {
      const { metadata } = await import(`@/markdown/${post.path}`);
      return { ...post, metadata };
    })
  );

  const postsToDisplay = postsWithMetadata;
  postsToDisplay.sort((post1, post2) => {
    const date1 = new Date(post1.metadata.date);
    const date2 = new Date(post2.metadata.date);
    return date2.getTime() - date1.getTime();
  });

  return (
    <div>
      <h2 className="mb-6 font-bold text-5xl">Articles</h2>
      <ul className="list-none space-y-12">
        {postsToDisplay.map(async ({ slug, metadata }) => {
          const formattedDate = formatDateForPost(metadata.date);
          return (
            <li key={slug}>
              <Link href={`/post/${slug}`}>
                <div className="mb-2">
                  <h2 className="mb-1 max-w-[600px] text-pretty font-bold text-2xl">
                    {metadata.title}
                  </h2>
                  {formattedDate && (
                    <div className="flex items-center text-slate-400 text-sm capitalize">
                      <CalendarFoldIcon
                        className="mr-1.5 inline-block"
                        size={14}
                      />
                      {formattedDate}
                    </div>
                  )}
                </div>
                <p className="text-base text-slate-500">{metadata.excerpt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
