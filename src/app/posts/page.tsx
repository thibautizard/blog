import Link from "next/link";
import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";

const canPublish = ({ metadata }: { metadata: { publish: boolean } }) =>
	process.env.NODE_ENV === "development" || metadata?.publish;

export default async function HomePage() {
	const posts = await getAllPosts();
	posts.reverse();

	return (
		<div>
			<ul className="space-y-12">
				{posts.map(async (post) => {
					const { metadata } = await import(
						`@/markdown/${post.slug}/${post.slug}.mdx`
					);
					if (!canPublish({ metadata })) return null;
					const formattedDate = formatDateForPost(metadata.date);
					return (
						<li key={post.slug}>
							<Link href={`/post/${post.slug}`}>
								<div className="mb-2">
									<h2 className="text-2xl font-bold mb-1">{metadata.title}</h2>
									{formattedDate && (
										<div className="text-sm text-gray-400 capitalize">
											{formattedDate}
										</div>
									)}
								</div>
								<p className="text-sm text-gray-500">{metadata.excerpt}</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
