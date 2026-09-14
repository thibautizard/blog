declare module "@code-hike/lighter/theme/github-from-css.mjs" {
  import type { RawTheme } from "@code-hike/lighter";

  const theme: RawTheme & Required<Pick<RawTheme, "tokenColors">>;
  export default theme;
}
