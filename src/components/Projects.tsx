import { featuredProjects, otherProjects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-slate-50 py-16 sm:py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="projects-heading" className="section-heading">
          Projects
        </h2>

        <h3 className="sr-only">Featured projects</h3>
        <ul className="mt-8 grid gap-8">
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} variant="featured" />
            </li>
          ))}
        </ul>

        {otherProjects.length > 0 && (
          <>
            <h3 className="mt-16 text-xl font-bold tracking-tight text-slate-900 dark:text-white">More projects</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
