/**
 * Shared visual language for the GitHub curation pages.
 *
 * Design intent (Apple-inspired): a single restrained accent (brand blue),
 * hairline borders, soft layered elevation in light mode, and quiet surfaces
 * in dark mode. Motion is subtle and always honours `prefers-reduced-motion`.
 */

/** Rounded, hairline-bordered surface used by every card-like container. */
export const GITHUB_SURFACE =
  'rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-white/[0.02]';

/** Soft, layered elevation. Light mode carries the depth; dark mode stays quiet. */
export const GITHUB_CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-24px_rgba(15,23,42,0.16)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]';

/** Interactive elevation for cards: gentle lift and a deeper shadow on hover. */
export const GITHUB_CARD_INTERACTIVE =
  'transition-[transform,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none hover:-translate-y-1 hover:border-black/[0.1] hover:shadow-[0_4px_10px_rgba(15,23,42,0.06),0_30px_60px_-28px_rgba(15,23,42,0.28)] dark:hover:border-white/[0.16]';

/** Primary call-to-action: solid brand fill with a quiet press response. */
export const GITHUB_BUTTON_PRIMARY =
  'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-[transform,background-color,box-shadow] duration-200 ease-out motion-reduce:transition-none hover:bg-brand/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950';

/** Secondary action: hairline-bordered neutral button. */
export const GITHUB_BUTTON_SECONDARY =
  'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black no-underline transition-[transform,background-color,border-color] duration-200 ease-out motion-reduce:transition-none hover:border-black/20 hover:bg-black/[0.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:bg-transparent dark:text-silver dark:hover:border-white/25 dark:hover:bg-white/[0.04] dark:focus-visible:ring-offset-gray-950';

/** Filter pill in the sticky toolbar (44px touch target per Apple HIG). */
export function githubTagButtonClass(active: boolean): string {
  const base =
    'shrink-0 inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-[background-color,color] duration-200 ease-out motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950';
  if (active) {
    return `${base} bg-brand text-white`;
  }
  return `${base} bg-black/[0.04] text-grey hover:bg-black/[0.07] hover:text-black dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/[0.1] dark:hover:text-white`;
}

/** Inline metadata tag rendered inside cards and the detail preview. */
export function githubMetaTagClass(active = false): string {
  const base =
    'inline-flex min-h-8 items-center rounded-full px-3 py-1 text-xs font-medium no-underline transition-[background-color,color] duration-200 ease-out motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950';
  if (active) {
    return `${base} bg-brand/10 text-brand`;
  }
  return `${base} bg-black/[0.04] text-grey hover:bg-brand/10 hover:text-brand dark:bg-white/[0.06] dark:text-gray-300 dark:hover:text-brand`;
}

export function formatGithubStars(stars: number): string {
  return stars.toLocaleString('en-US');
}

/** Compact star count for list cards, e.g. 45234 → "45k+", 1200 → "1.2k+". */
export function formatGithubStarsCompact(stars: number): string {
  if (stars >= 10_000) {
    return `${Math.round(stars / 1000)}k+`;
  }
  if (stars >= 1_000) {
    const k = stars / 1000;
    const rounded = k >= 10 ? `${Math.round(k)}` : k.toFixed(1).replace(/\.0$/, '');
    return `${rounded}k+`;
  }
  return '<1k+';
}

/** Compact count for forks, issues, contributors on social cards. */
export function formatGithubStatCompact(value: number | undefined): string {
  if (value === undefined || value < 0) return '—';
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(value);
}
