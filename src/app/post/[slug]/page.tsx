import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";
import "./post.css";

// Disable dynamic params to avoid re-rendering the page for each request
export const dynamicParams = false;

// Generate static params to avoid re-rendering the page for each request
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

	const formattedDate = formatDateForPost(metadata.date);
	return (
		<div>
			<header className="flex flex-col gap-2 mb-4">
				<h2 className="text-3xl font-bold">{metadata.title}</h2>
				{formattedDate && (
					<div className="text-sm text-gray-500">{formattedDate}</div>
				)}
			</header>
			<Post {...metadata} />
		</div>
	);
}
