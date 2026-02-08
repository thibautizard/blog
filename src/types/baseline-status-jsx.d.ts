import "react";

declare module "react" {
  // biome-ignore lint/style/noNamespace: Required for JSX intrinsic element declaration
  namespace JSX {
    interface IntrinsicElements {
      "baseline-status": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { featureId?: string },
        HTMLElement
      >;
    }
  }
}
