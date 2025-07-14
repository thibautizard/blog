import Link from "next/link";

import { getAllPosts } from "@/utils/posts";

export default async function HomePage() {
	const posts = await getAllPosts();
	return (
		<div>
			<ul className="space-y-6">
				{posts.map(async (post) => {
					const { metadata } = await import(
						`@/markdown/${post.slug}/${post.slug}.mdx`
					);
					return (
						<li key={post.slug}>
							<Link href={`/post/${post.slug}`}>
								<div className="mb-2">
									<h2 className="text-2xl font-bold mb-1">{metadata.title}</h2>
									<div className="text-sm text-gray-500">{metadata.date}</div>
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
