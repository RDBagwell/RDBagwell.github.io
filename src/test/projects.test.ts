import { projects } from '../data/projects';
import { profile } from '../data/profile';

// Files in public/, keyed as "/projects/foo.webp" (resolved by Vite at test time).
const publicFiles = new Set(
  Object.keys(import.meta.glob('../../public/**/*', { query: '?url', eager: true })).map((k) =>
    k.replace('../../public', ''),
  ),
);

const STATUSES = ['live', 'local', 'coming-soon'];

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

describe('projects data', () => {
  it('has at least one featured and one non-featured project', () => {
    expect(projects.some((p) => p.featured)).toBe(true);
    expect(projects.some((p) => !p.featured)).toBe(true);
  });

  it('uses unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  describe.each(projects.map((p) => [p.slug, p] as const))('%s', (_slug, p) => {
    it('has every required field filled in', () => {
      for (const key of ['title', 'tagline', 'description', 'image', 'imageAlt'] as const) {
        expect(p[key].trim(), key).not.toBe('');
      }
      expect(p.tech.length).toBeGreaterThan(0);
      p.tech.forEach((t) => expect(t.trim()).not.toBe(''));
      expect(typeof p.featured).toBe('boolean');
      expect(STATUSES).toContain(p.status);
      expect(p.imageWidth).toBeGreaterThan(0);
      expect(p.imageHeight).toBeGreaterThan(0);
    });

    it('has valid https links', () => {
      if (p.links.code !== undefined) expect(isHttpsUrl(p.links.code)).toBe(true);
      expect(Boolean(p.links.code || p.links.demo), 'needs a code or demo link').toBe(true);
      if (p.links.demo !== undefined) expect(isHttpsUrl(p.links.demo)).toBe(true);
    });

    it('has a demo link exactly when it is live', () => {
      expect(Boolean(p.links.demo)).toBe(p.status === 'live');
    });

    it('points at an image that exists in public/', () => {
      expect(p.image.startsWith('/')).toBe(true);
      expect(publicFiles.has(p.image), `${p.image} missing from public/`).toBe(true);
    });
  });
});

describe('profile data', () => {
  it('has valid https links where set', () => {
    expect(isHttpsUrl(profile.github)).toBe(true);
    if (profile.linkedin) expect(isHttpsUrl(profile.linkedin)).toBe(true);
  });

  it('has a plausible email where set', () => {
    if (profile.email) expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
