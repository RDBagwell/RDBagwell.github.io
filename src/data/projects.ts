import type { Project } from './types';

// To add a project: add an object to this array, drop its screenshot in
// public/projects/, and push. Featured projects appear first, in array order.
export const projects: Project[] = [
  {
    slug: 'bulk-csv-importer',
    title: 'Bulk CSV Importer',
    tagline: 'Import millions of rows without falling over.',
    description:
      'A rebuild of a naive CSV uploader into a streaming, parallel import pipeline, measured before and after. The original took 20 minutes for a million rows (and crashed at PHP\u2019s default memory limit); the rebuild does it in about 11 seconds with flat memory. Chunks split on true record boundaries, even with line breaks inside quoted fields; retries can\u2019t duplicate rows; and bad rows land in a downloadable error report instead of stopping the import.',
    tech: [
      'Laravel 13',
      'React + Inertia',
      'TypeScript',
      'MySQL 8',
      'Redis + Horizon',
      'Docker',
      'league/csv',
      'GitHub Actions CI',
    ],
    featured: true,
    status: 'local',
    links: { code: 'https://github.com/RDBagwell/bulk-csv-importer' },
    image: '/projects/bulk-csv-importer.webp',
    imageWidth: 1280,
    imageHeight: 860,
    imageFocus: 'top-left',
    imageAlt:
      'Bulk CSV Importer importing a one-million-row file: a progress bar at 50.8%, about 80,000 rows per second, imported and failed row counts, and a table of the latest row errors.',
    note: '1,000,000 rows: 20 min 20 s before, 11.1 s after (4 workers). Full method and raw results are in the repo\u2019s BENCHMARKS.md.',
  },
  {
    slug: 'manuscript-tracker',
    title: 'Manuscript Tracker',
    tagline: 'Query tracking for working authors.',
    description:
      "A full-stack app for managing literary agent submissions, built by a novelist in the middle of querying. Every query is an append-only event ledger (sent, partial requested, materials sent, rejected), so status and response-time stats come straight from the history. It warns when an agency's “a no from one is a no from all” policy applies and schedules follow-up nudges.",
    tech: [
      'Laravel 13',
      'React 18',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Sanctum auth',
      'PHPUnit + Vitest',
      'GitHub Actions CI',
    ],
    featured: true,
    status: 'local',
    links: { code: 'https://github.com/RDBagwell/manuscript-tracker' },
    image: '/projects/manuscript-tracker.webp',
    imageWidth: 960,
    imageHeight: 600,
    imageFocus: 'top-left',
    imageAlt:
      'Manuscript Tracker queries screen: a list of agent queries, one expanded to show its correspondence log of sent, partial requested and materials sent events.',
  },
  {
    slug: 'netcode-pong',
    title: 'Netcode Pong',
    tagline: 'Real-time multiplayer, with the netcode you can see.',
    description:
      'Multiplayer Pong rebuilt the way real online games work: the server runs the match, your paddle responds instantly through client-side prediction and reconciliation, and the opponent stays smooth through interpolation. A built-in network lab lets you add lag, jitter and packet loss, then switch each technique off to feel why it exists. Quick match, private rooms, a computer opponent, and an offline mode for when the server is asleep.',
    tech: ['TypeScript', 'Node.js', 'Socket.io', 'Canvas', 'Vite', 'Zod', 'Vitest + Playwright', 'GitHub Pages + Render'],
    featured: true,
    status: 'live',
    links: {
      demo: 'https://rdbagwell.github.io/netcode-pong/',
      code: 'https://github.com/RDBagwell/netcode-pong',
    },
    demoLabel: 'Play',
    image: '/projects/netcode-pong.webp',
    imageWidth: 1440,
    imageHeight: 860,
    imageFocus: 'top-left',
    imageAlt:
      'Netcode Pong with the network lab open on the "Bad Wi-Fi" preset: dashed outlines show the server\u2019s true paddle and ball positions behind the smooth on-screen ones, beside latency, jitter and packet-loss sliders and prediction, reconciliation and interpolation toggles.',
    note: 'Measured: about 3 kB/s per player, and one CPU core runs roughly 600 matches at a steady 60 Hz. The server sleeps when idle; play the computer offline while it wakes.',
  },
  {
    slug: 'reading-game',
    title: 'Reading Game',
    tagline: 'A word-finding game I first built for my daughter.',
    description:
      'Pip the owl says a word out loud and the child taps the matching card; a wrong tap reads that word aloud, so every mistake becomes a small lesson. Twelve levels follow the order phonics is taught, and the wrong answers get trickier too: rhymes, then look-alikes like ship, shop and chip. Stars, high scores and player profiles stay on the device, with no accounts, tracking or network requests.',
    tech: ['JavaScript', 'SVG', 'Web Speech API', 'Web Audio', 'Vitest'],
    featured: true,
    status: 'live',
    links: {
      demo: 'https://rdbagwell.github.io/Reading_Game/',
      code: 'https://github.com/RDBagwell/Reading_Game',
    },
    demoLabel: 'Play',
    image: '/projects/reading-game.webp',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt:
      'Reading Game, level 7 \u201cCake Castle\u201d: nine word cards; \u201crope\u201d glows green with confetti and +14 points, beside Pip the owl and a \u201cHear it again\u201d button.',
    note: 'Started when my daughter was in first grade and liked video games more than her reading homework.',
  },
  {
    slug: 'chat-mafia',
    title: 'Chat Mafia',
    tagline: 'Real-time multiplayer Mafia in the browser.',
    description:
      'The classic social deduction game, played online with friends. Separate General, Mafia and Dead chats with server-enforced permissions: fallen players become observers who can only talk to each other. It has host controls including kicking players, bots to fill empty seats, and groundwork for AI players. Built security-first: the server is authoritative, and every input is validated and rate-limited.',
    tech: ['Node.js', 'Express', 'Socket.io', 'JavaScript', 'Zod', 'Vitest', 'GitHub Pages + Render'],
    featured: false,
    status: 'live',
    links: {
      demo: 'https://rdbagwell.github.io/Chat_Mafia_Game/',
      code: 'https://github.com/RDBagwell/Chat_Mafia_Game',
    },
    demoLabel: 'Play',
    image: '/projects/chat-mafia.webp',
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt: 'Chat Mafia game lobby screenshot.',
    note: 'The game server sleeps when idle — the first connection can take up to a minute.',
  },
  {
    slug: 'rpg',
    title: 'Island RPG',
    tagline: 'A top-down RPG on a custom engine I built.',
    description:
      'A classic top-down RPG built on my own 2D engine instead of a game framework: a scene stack, Tiled map loading, collision, saves and a canvas UI toolkit. Explore two islands, talk your way through branching dialogue, recruit companions, follow a quest chain and fight turn-based battles with elemental weaknesses. Three save slots, gamepad and touch controls, and an original chiptune soundtrack.',
    tech: ['JavaScript', 'Vite', 'Canvas 2D', 'Web Audio', 'Tiled', 'Vitest'],
    featured: false,
    status: 'live',
    links: {
      demo: 'https://rpg-demo.onrender.com/',
      // The source stays private: the licensed tileset can't be redistributed as files.
    },
    demoLabel: 'Play',
    image: '/projects/rpg.webp',
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt:
      'Island RPG: pixel-art hero on a grassy island with a red-roofed cottage, villagers, a glowing save crystal and a wooden bridge over turquoise water.',
    note: 'Tileset by Cyporkador. Source code is private because the licensed art can\u2019t be shared as files; happy to walk through it.',
  },
  {
    slug: 'bull-rush',
    title: 'Bull Rush',
    tagline: 'A 2D canvas herding game.',
    description:
      'Steer a bull with the mouse to shepherd eggs and hatchlings to safety while enemies charge across the field. Features circle-collision physics, sprite animation and particle effects. Save 50 to win.',
    tech: ['JavaScript', 'HTML Canvas'],
    featured: false,
    status: 'live',
    links: {
      demo: 'https://rdbagwell.github.io/Bull_Rush/',
      code: 'https://github.com/RDBagwell/Bull_Rush',
    },
    demoLabel: 'Play',
    image: '/projects/bull-rush.webp',
    imageWidth: 960,
    imageHeight: 540,
    imageAlt:
      'Bull Rush gameplay: a blue horned bull among giant blue mushrooms and ferns, with spotted eggs and red clawed enemies on a dirt field.',
    // TODO(robert): optional tutorial credit, e.g. note: 'Built following a tutorial by …'
  },
  {
    slug: 'shooter',
    title: 'Shooter',
    tagline: 'A side-scrolling arcade shooter.',
    description:
      'Arrow keys to move, Space to fire. Manage recharging ammo against waves of enemies with different toughness, up to a heavily armored Hivewhale. Features parallax scrolling backgrounds, particle explosions and sound effects.',
    tech: ['JavaScript', 'HTML Canvas', 'Web Audio'],
    featured: false,
    status: 'live',
    links: {
      demo: 'https://rdbagwell.github.io/Shooter/',
      code: 'https://github.com/RDBagwell/Shooter',
    },
    demoLabel: 'Play',
    image: '/projects/shooter.webp',
    imageWidth: 700,
    imageHeight: 500,
    imageAlt:
      'Shooter gameplay: a mechanical seahorse and a toothy mechanical anglerfish over a steampunk city of gears and pipes, with the score and ammo bar along the top.',
    // TODO(robert): optional tutorial credit, e.g. note: 'Built following a tutorial by …'
  },
  {
    slug: '3d-game',
    title: '3D Game',
    tagline: 'A 3D action prototype.',
    description:
      'A third-person 3D prototype with a physics-driven animated character, an enemy robot, Xbox gamepad controls and positional sound.',
    tech: ['Three.js', 'Rapier physics', 'Vite', 'JavaScript'],
    featured: false,
    status: 'coming-soon',
    // No demo yet: the repo has no Pages build step, so its live page doesn't run.
    links: { code: 'https://github.com/RDBagwell/3D_Game' },
    // TODO(robert): replace the placeholder with a real screenshot.
    image: '/projects/3d-game-placeholder.svg',
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt: 'Placeholder graphic for 3D Game; a screenshot is coming soon.',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
