import type { Project } from '../data/types';
import ExternalLink from './ExternalLink';
import StatusBadge from './StatusBadge';
import { GitHubIcon } from './Hero';

const FOCUS = { top: 'object-top', 'top-left': 'object-left-top', center: 'object-center' } as const;

type Props = { project: Project; variant?: 'featured' | 'compact' };

export default function ProjectCard({ project, variant = 'compact' }: Props) {
  const featured = variant === 'featured';
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
        featured ? 'lg:flex-row' : ''
      }`}
    >
      <div
        className={`relative aspect-video shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 ${
          featured ? 'lg:aspect-auto lg:w-1/2' : ''
        }`}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${FOCUS[project.imageFocus ?? 'top']}`}
        />
      </div>

      <div className={`flex flex-1 flex-col gap-3 ${featured ? 'p-6 sm:p-8' : 'p-5'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4
            id={headingId}
            className={`font-bold tracking-tight text-slate-900 dark:text-white ${featured ? 'text-2xl' : 'text-lg'}`}
          >
            {project.title}
          </h4>
          <StatusBadge status={project.status} />
        </div>
        <p className={`font-medium text-indigo-700 dark:text-indigo-300 ${featured ? 'text-base' : 'text-sm'}`}>
          {project.tagline}
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

        <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.note && (
          <p className="rounded-md border-l-4 border-amber-500 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/60 dark:text-amber-100">
            {project.note}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.links.demo && (
            <ExternalLink href={project.links.demo} className="btn-primary">
              {project.demoLabel ?? 'Live demo'}
              <span className="sr-only">: {project.title}</span>
            </ExternalLink>
          )}
          {project.links.code && (
            <ExternalLink href={project.links.code} className="btn-secondary">
              <GitHubIcon />
              Code
              <span className="sr-only">: {project.title}</span>
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}
