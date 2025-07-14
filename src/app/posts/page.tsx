import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

async function getPosts() {
	const postsDir = path.join(process.cwd(), "src", "posts");
	const files = await fs.promises.readdir(postsDir);
	const posts = [];

	for (const file of files) {
		if (file.endsWith(".mdx")) {
			const slug = file.replace(/\.mdx$/, "");
			const filePath = path.join(postsDir, file);
			const content = await fs.promises.readFile(filePath, "utf8");
			const { data } = matter(content);
			posts.push({
				name: data.title || file.replace(/\.mdx$/, ""),
				excerpt: data.excerpt || "",
				slug,
			});
		}
	}

	return posts;
}

export default async function HomePage() {
	const posts = await getPosts();
	return (
		<div>
			<ul>
				{posts.map((post) => (
					<li key={post.name}>
						<Link href={`/posts/${post.slug}`}>
							<h2 className="text-2xl font-bold mb-1">{post.name}</h2>
							<p className="text-sm text-gray-500">{post.excerpt}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
