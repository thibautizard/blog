// biome-ignore lint/style/noNamespace: Required for JSX intrinsic element declaration
declare namespace JSX {
  interface IntrinsicElements {
    "baseline-status": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & { featureId?: string },
      HTMLElement
    >;
  }
}
