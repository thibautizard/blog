export function formatDateForPost(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  const userBrowserLocale = navigator.language;
  const DEFAULT_LOCALE = "fr-FR";
  const locale = userBrowserLocale || DEFAULT_LOCALE;

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
