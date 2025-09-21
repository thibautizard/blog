export function formatDateForPost(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  const DEFAULT_LOCALE = "fr-FR";
  const userBrowserLocale =
    typeof navigator !== "undefined" ? navigator.language : null;
  const locale = userBrowserLocale ?? DEFAULT_LOCALE;

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
