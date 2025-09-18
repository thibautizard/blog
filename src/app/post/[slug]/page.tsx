import { unstable_ViewTransition as ViewTransition } from "react";
import { formatDateForPost } from "@/lib/dates";
import { getAllPosts } from "@/lib/posts";

import "./post.css";
import type { Metadata } from "next";
import Link from "next/link";

// Disable dynamic params to avoid re-rendering the page for each request
export const dynamicParams = false;

// Generate static params to avoid re-rendering the page for each request
export async function generateStaticParams() {
	const posts = await getAllPosts();
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
		title,
		description: metadata.excerpt,
		openGraph: {
			title,
			description: metadata.excerpt,
			type: "article",
			publishedTime: metadata.date,
		},
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

	const formattedDate = formatDateForPost(metadata.date);
	return (
		<div className="post-container">
			<ViewTransition name="articles">
				<h2 className="text-zinc-400 font-regular">
					<Link href="/posts">/ Articles</Link>
				</h2>
			</ViewTransition>
			<header className="flex flex-col gap-2 mb-4">
				<h2 className="text-3xl font-bold text-balance">{metadata.title}</h2>
				{formattedDate && (
					<div className="text-sm text-gray-500">{formattedDate}</div>
				)}
			</header>
			<Post {...metadata} />
		</div>
	);
}
