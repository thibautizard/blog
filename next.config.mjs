import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: { rehypePlugins: ["rehype-slug"] }, // Create id for headings
});

export default withMDX(nextConfig);
