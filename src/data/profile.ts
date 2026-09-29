import type { Profile } from './types';

export const profile: Profile = {
  name: 'Robert Bagwell',
  title: 'Senior Full-Stack Engineer',
  // Draft — Robert to review.
  pitch:
    'I build full-stack web apps and browser games — Laravel and React by day, real-time multiplayer and game systems by night.',
  // Draft — Robert to review. One string per paragraph.
  bio: [
    "I'm a senior full-stack engineer with 12+ years of experience building for the web, working mainly in PHP/Laravel and React. I studied digital entertainment and game design, and it still shows: when I'm not shipping production apps, I'm building browser games and multiplayer experiments. I care about software that's secure, tested, and pleasant to use.",
  ],
  // TODO(robert): public contact email address.
  email: '',
  github: 'https://github.com/RDBagwell',
  // TODO(robert): LinkedIn profile URL, e.g. https://www.linkedin.com/in/your-handle/
  linkedin: '',
  // TODO(robert): optional, e.g. "Currently at Example Co." — leave '' to hide.
  employer: '',
  // TODO(robert): headshot. Put a square WebP (e.g. 480×480) in public/ and set src, e.g. '/headshot.webp'.
  photo: { src: '', alt: 'Robert Bagwell', width: 480, height: 480 },
  skills: [
    {
      area: 'Back end',
      skills: ['PHP', 'Laravel', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'MySQL', 'Redis'],
    },
    { area: 'Front end', skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind', 'HTML/CSS'] },
    { area: 'Games & graphics', skills: ['Canvas 2D', 'Three.js', 'Rapier physics'] },
    { area: 'Tooling', skills: ['Docker', 'GitHub Actions', 'Vite', 'Testing'] },
  ],
};
