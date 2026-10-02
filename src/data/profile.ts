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
  email: 'erbagwell@yahoo.com',
  github: 'https://github.com/RDBagwell',
  linkedin: 'https://www.linkedin.com/in/robert-bagwell-7b7509167/',
  employer: 'Bucked Up',
  photo: { src: '/headshot.webp', alt: 'Robert Bagwell', width: 480, height: 480 },
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
