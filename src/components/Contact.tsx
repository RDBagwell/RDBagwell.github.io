import { profile } from '../data/profile';
import DevTodo from './DevTodo';
import ExternalLink from './ExternalLink';

export default function Contact() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 id="contact-heading" className="section-heading">
          Contact
        </h2>
        <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
          Want to talk about a role or a project? Get in touch.
        </p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {profile.email && (
            <li>
              <a href={`mailto:${profile.email}`} className="link">
                {profile.email}
              </a>
            </li>
          )}
          <li>
            <ExternalLink href={profile.github} className="link">
              GitHub
            </ExternalLink>
          </li>
          {profile.linkedin && (
            <li>
              <ExternalLink href={profile.linkedin} className="link">
                LinkedIn
              </ExternalLink>
            </li>
          )}
        </ul>
        {!profile.email && <DevTodo>email (profile.email)</DevTodo>}{' '}
        {!profile.linkedin && <DevTodo>LinkedIn URL (profile.linkedin)</DevTodo>}
        <p className="mt-12 text-sm text-slate-600 dark:text-slate-400">
          © {year} {profile.name}. All rights reserved.
        </p>
      </section>
    </footer>
  );
}
