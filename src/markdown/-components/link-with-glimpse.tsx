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
        <GlimpseImage src={data.image ?? ""} />
        <GlimpseTitle>{data.title}</GlimpseTitle>
        <GlimpseDescription>{data.description}</GlimpseDescription>
      </GlimpseContent>
    </Glimpse>
  );
};

export default LinkWithGlimpse;
