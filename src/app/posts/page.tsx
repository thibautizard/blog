import Link from "next/link";
import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";

const canPublish = ({ metadata }: { metadata: { publish: boolean } }) =>
	process.env.NODE_ENV === "development" || metadata?.publish;

export default async function HomePage() {
	const posts = await getAllPosts();

	const postsWithMetadata = await Promise.all(
		posts.map(async (post) => {
			const { metadata } = await import(`@/markdown/${post.path}`);
			return { ...post, metadata };
		}),
	);

	const postsToDisplay = postsWithMetadata.filter(canPublish);
	postsToDisplay.sort((post1, post2) => {
		const date1 = new Date(post1.metadata.date);
		const date2 = new Date(post2.metadata.date);
		return date2.getTime() - date1.getTime();
	});

	return (
		<div>
			<ul className="space-y-12 list-none">
				{postsToDisplay.map(async ({ slug, metadata }) => {
					if (!canPublish({ metadata })) return null;
					const formattedDate = formatDateForPost(metadata.date);
					return (
						<li key={slug}>
							<Link href={`/post/${slug}`}>
								<div className="mb-2">
									<h2 className="text-2xl max-w-[600px] text-pretty font-bold mb-1">
										{metadata.title}
									</h2>
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
