import { Code } from "bright";
import { type ComponentProps, isValidElement, type ReactNode } from "react";
import CopyButton from "./copy-button";

/* MDX renders a fence as <pre><code className="language-xxx">raw text</code></pre> */
function getRawCode(children: ReactNode): string {
  if (!isValidElement<{ children?: ReactNode }>(children)) {
    return "";
  }
  const code = children.props.children;
  return typeof code === "string" ? code.trimEnd() : "";
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
