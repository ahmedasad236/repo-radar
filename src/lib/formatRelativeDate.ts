const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

const DIVISIONS = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
] as const;

export function formatRelativeDate(
  iso: string | null | undefined,
): string | undefined {
  if (iso === undefined) return undefined;
  if (iso === null) return "no commits";

  const timestamp = Date.parse(iso);
  if (Number.isNaN(timestamp)) return "unknown";

  let duration = (timestamp - Date.now()) / 1000;

  for (const { amount, unit } of DIVISIONS) {
    if (Math.abs(duration) < amount) {
      return rtf.format(Math.round(duration), unit);
    }
    duration /= amount;
  }

  return "unknown";
}
