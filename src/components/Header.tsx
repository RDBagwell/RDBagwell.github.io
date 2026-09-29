import { profile } from '../data/profile';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <a href="#top" className="rounded font-bold tracking-tight text-slate-900 dark:text-white">
          {profile.name}
        </a>
        <div className="flex items-center">
          <nav aria-label="Primary">
            <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 sm:px-3 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
