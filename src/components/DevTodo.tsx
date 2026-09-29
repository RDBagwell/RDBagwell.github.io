/**
 * Visible reminder for content that still needs filling in. Rendered only by
 * the dev server (`npm run dev`); production builds drop it entirely.
 */
export default function DevTodo({ children }: { children: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <span className="inline-block rounded border border-dashed border-amber-600 bg-amber-50 px-2 py-0.5 font-mono text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-200">
      TODO: {children}
    </span>
  );
}
