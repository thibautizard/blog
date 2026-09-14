import githubFromCss from "@code-hike/lighter/theme/github-from-css.mjs";
import { Code } from "bright";
import type { MDXComponents } from "mdx/types";

/**
 * `github-from-css` maps every color to a `--ch-*` CSS variable, so the palette
 * lives in code-snippet.css. The two extra rules narrow its widest slot: it
 * normally colors every constant, support and variable token, and here only the
 * name being declared keeps that color, the rest falls back to the foreground.
 */
Code.theme = {
  ...githubFromCss,
  name: "blog",
  tokenColors: [
    ...githubFromCss.tokenColors,
    {
      scope: [
        "constant",
        "entity",
        "support",
        "support.constant",
        "support.variable",
        "support.type.property-name",
        "variable",
        "meta.property-name",
        "meta.object-literal.key",
        "string variable",
      ],
      settings: { foreground: "var(--ch-4)" },
    },
    {
      // `value` in `const value = …`, including let/var and destructured names
      scope: [
        "variable.other.constant",
        "meta.definition.variable variable.other.readwrite",
      ],
      settings: { foreground: "var(--ch-2)" },
    },
    {
      // CSS selectors only — scoped to `source.css` so JSX and HTML attribute
      // names, which share the `entity.other.attribute-name` scope, stay neutral
      scope: [
        "source.css entity.name.tag",
        "source.css entity.other.attribute-name",
      ],
      settings: { foreground: "var(--ch-5)" },
    },
  ],
};

Code.lineNumbers = true;
/* Merged last into Bright's inline style on the wrapper, which defaults to 4px */
Code.style = { borderRadius: "var(--code-border-radius)" };
Code.displayName = "test";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
  };
}
