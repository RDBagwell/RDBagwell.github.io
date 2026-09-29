export type ProjectStatus = 'live' | 'local' | 'coming-soon';

export type Project = {
  /** Unique, URL-safe id. Also used for the card's DOM id. */
  slug: string;
  title: string;
  /** One line, shown under the title. */
  tagline: string;
  /** Two to four sentences. */
  description: string;
  tech: string[];
  /** Featured projects get the large cards at the top. */
  featured: boolean;
  status: ProjectStatus;
  links: {
    /** Playable / live URL. Omit it and the Play button is hidden. */
    demo?: string;
    /** Source code URL. */
    code: string;
  };
  /** Label for the demo button. Defaults to "Live demo". */
  demoLabel?: string;
  /** Path under /public, e.g. "/projects/my-app.webp". */
  image: string;
  /** Intrinsic pixel size of the image file (prevents layout shift). */
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  /** Which part of the image stays visible when it is cropped to fit. Default 'top'. */
  imageFocus?: 'top' | 'top-left' | 'center';
  /** Small print under the description: cold-start warning, credits, etc. */
  note?: string;
};

export type SkillGroup = { area: string; skills: string[] };

export type Profile = {
  name: string;
  title: string;
  pitch: string;
  bio: string[];
  /** Leave empty ('') until known: empty values are hidden on the live site. */
  email: string;
  github: string;
  linkedin: string;
  /** Optional line such as "Currently at Example Co." Leave '' to hide. */
  employer: string;
  /** Optional headshot. Leave src '' to hide. */
  photo: { src: string; alt: string; width: number; height: number };
  skills: SkillGroup[];
};
