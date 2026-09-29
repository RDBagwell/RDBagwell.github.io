import { profile } from '../data/profile';
import DevTodo from './DevTodo';

export default function About() {
  const { photo } = profile;
  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="about-heading" className="section-heading">
            About
          </h2>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="size-32 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <DevTodo>headshot (profile.photo.src)</DevTodo>
            )}
            <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {profile.bio.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
              {profile.employer ? (
                <p className="font-medium text-slate-900 dark:text-white">{profile.employer}</p>
              ) : (
                <DevTodo>optional employer line (profile.employer)</DevTodo>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Skills</h3>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {profile.skills.map((group) => (
              <div key={group.area}>
                <dt className="text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
                  {group.area}
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
