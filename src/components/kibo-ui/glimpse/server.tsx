const TITLE_REGEX = /<title[^>]*>([^<]+)<\/title>/;
const OG_TITLE_REGEX = /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/;
const DESCRIPTION_REGEX = /<meta[^>]*name="description"[^>]*content="([^"]+)"/;
const OG_DESCRIPTION_REGEX =
  /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/;
const OG_IMAGE_REGEX = /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/;

const FETCH_TIMEOUT_MS = 10_000;

const EMPTY_PREVIEW = { title: null, description: null, image: null };

export const glimpse = async (url: string) => {
  let data: string;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) return EMPTY_PREVIEW;

    data = await response.text();
  } catch {
    // An unreachable or slow link must not break the build.
    return EMPTY_PREVIEW;
  }

  const titleMatch = data.match(TITLE_REGEX) || data.match(OG_TITLE_REGEX);
  const descriptionMatch =
    data.match(DESCRIPTION_REGEX) || data.match(OG_DESCRIPTION_REGEX);
  const imageMatch = data.match(OG_IMAGE_REGEX);

  return {
    title: titleMatch?.at(1) ?? null,
    description: descriptionMatch?.at(1) ?? null,
    image: imageMatch?.at(1) ?? null,
  };
};
