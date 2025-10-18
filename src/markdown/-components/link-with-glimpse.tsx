import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "@/components/kibo-ui/glimpse";
import { glimpse } from "@/components/kibo-ui/glimpse/server";

const LinkWithGlimpse = async ({
  url,
  children,
  internalLink = false,
}: {
  url: string;
  children: React.ReactNode;
  internalLink?: boolean;
}) => {
  const data = await glimpse(url);

  if(!data?.title) return null;

  return (
    <Glimpse closeDelay={0} openDelay={0}>
      <GlimpseTrigger asChild>
        <a
          href={url}
          rel={internalLink ? undefined : "noopener"}
          target={internalLink ? undefined : "_blank"}
        >
          {children}
        </a>
      </GlimpseTrigger>
      <GlimpseContent className="w-80">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {data.image && <GlimpseImage src={data.image} />}
          {data.title && <GlimpseTitle>{data.title}</GlimpseTitle>}
          {data.description && <GlimpseDescription>{data.description}</GlimpseDescription>}
        </a>
      </GlimpseContent>
    </Glimpse>
  );
};

export default LinkWithGlimpse;
