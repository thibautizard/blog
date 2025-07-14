import { getAllPosts } from "@/utils/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
	const posts = await getAllPosts();
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

	return (
		<div>
			<header className="flex flex-col gap-2 mb-4">
				<h2 className="text-2xl font-bold">{metadata.title}</h2>
				<div className="text-sm text-gray-500">{metadata.date}</div>
			</header>
			<Post {...metadata} />
		</div>
	);
}
