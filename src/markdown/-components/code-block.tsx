import { Code } from "bright";
import { type ComponentProps, isValidElement, type ReactNode } from "react";
import CopyButton from "./copy-button";

/* Bright's annotation comments (`// mark`, `{/* mark(1:3) *\/}`…) stripped from
   the display, so they must not end up in the clipboard either */
const ANNOTATION_LINE =
  /^[ \t]*(?:\/\/|#|\{?\/\*)[ \t]*mark(?:\(\d+(?::\d+)?\))?[^\n]*(?:\n|$)/gm;

/* MDX renders a fence as <pre><code className="language-xxx">raw text</code></pre> */
function getRawCode(children: ReactNode): string {
  if (!isValidElement<{ children?: ReactNode }>(children)) {
    return "";
  }
  const code = children.props.children;
  return typeof code === "string"
    ? code.replace(ANNOTATION_LINE, "").trimEnd()
    : "";
}

function CodeBlock(props: ComponentProps<typeof Code>) {
  return (
    <div className="code-block">
      <Code {...props} />
      <CopyButton code={getRawCode(props.children)} />
    </div>
  );
}

export default CodeBlock;
