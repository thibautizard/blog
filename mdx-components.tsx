import { Code } from "bright";
import type { MDXComponents } from "mdx/types";

Code.theme = "one-dark-pro";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
  };
}
