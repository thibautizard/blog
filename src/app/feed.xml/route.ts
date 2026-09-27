import { getSortedPostsWithMetadata } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const xmlEntities: Record<string, string> = {
  "'": "&apos;",
  '"': "&quot;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => xmlEntities[char] ?? char);
}

export async function GET() {
  const posts = await getSortedPostsWithMetadata();
  const feedUrl = `${site.url}/feed.xml`;
  const iconUrl = `${site.url}/feed-icon.png`;
  const lastBuildDate = posts[0]
    ? new Date(posts[0].metadata.date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map(({ slug, metadata }) => {
      const url = `${site.url}/post/${slug}`;
      return `    <item>
      <title>${escapeXml(metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(metadata.date).toUTCString()}</pubDate>
      <description>${escapeXml(metadata.excerpt)}</description>
      <dc:creator>${escapeXml(site.author)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${iconUrl}</url>
      <title>${escapeXml(site.title)}</title>
      <link>${site.url}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <webfeeds:icon>${iconUrl}</webfeeds:icon>
    <webfeeds:logo>${site.url}/icon.svg</webfeeds:logo>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
