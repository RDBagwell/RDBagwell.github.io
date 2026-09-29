import type { ProjectStatus } from '../data/types';

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  local: 'Runs locally',
  'coming-soon': 'Demo coming soon',
};

const STYLES: Record<ProjectStatus, string> = {
  live: 'bg-emerald-100 text-emerald-900 ring-emerald-700/30 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-400/30',
  local: 'bg-sky-100 text-sky-900 ring-sky-700/30 dark:bg-sky-950 dark:text-sky-200 dark:ring-sky-400/30',
  'coming-soon': 'bg-amber-100 text-amber-900 ring-amber-700/30 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-400/30',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STYLES[status]}`}>
      {status === 'live' && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      <span className="sr-only">Status: </span>
      {STATUS_LABELS[status]}
    </span>
  );
}
