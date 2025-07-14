import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

async function getPost(slug: string) {
	const postsDir = path.join(process.cwd(), "src", "posts");
	const files = await fs.promises.readdir(postsDir);

	for (const file of files) {
		if (file.endsWith(".mdx") && file.startsWith(slug)) {
			const filePath = path.join(postsDir, file);
			const content = await fs.promises.readFile(filePath, "utf8");
			const { data } = matter(content);
			return {
				...data,
				content,
			};
		}
	}

	return null;
}

export default async function PostView({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getPost(slug);
	console.log("post", post);
	return <div>{post?.content}</div>;
}
