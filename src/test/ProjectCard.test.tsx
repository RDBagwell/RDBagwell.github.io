import { render, screen, within } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../data/types';

const base: Project = {
  slug: 'example',
  title: 'Example',
  tagline: 'A tagline.',
  description: 'A description.',
  tech: ['TypeScript'],
  featured: false,
  status: 'live',
  links: { code: 'https://github.com/example/example', demo: 'https://example.com/' },
  image: '/projects/example.webp',
  imageWidth: 960,
  imageHeight: 540,
  imageAlt: 'Example screenshot',
};

describe('ProjectCard', () => {
  it('renders both buttons when both links exist', () => {
    render(<ProjectCard project={base} />);
    const demo = screen.getByRole('link', { name: /live demo/i });
    const code = screen.getByRole('link', { name: /code/i });
    expect(demo).toHaveAttribute('href', 'https://example.com/');
    expect(code).toHaveAttribute('href', 'https://github.com/example/example');
  });

  it('hides the demo button when there is no demo link', () => {
    render(<ProjectCard project={{ ...base, status: 'local', links: { code: base.links.code } }} />);
    expect(screen.queryByRole('link', { name: /demo|play/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /code/i })).toBeInTheDocument();
    expect(screen.getByText('Runs locally')).toBeInTheDocument();
  });

  it('uses a custom demo label', () => {
    render(<ProjectCard project={{ ...base, demoLabel: 'Play' }} />);
    expect(screen.getByRole('link', { name: /^play/i })).toBeInTheDocument();
  });

  it('marks every external link noopener noreferrer', () => {
    render(<ProjectCard project={base} />);
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  it('renders the image with alt text and explicit dimensions', () => {
    render(<ProjectCard project={base} />);
    const img = screen.getByRole('img', { name: 'Example screenshot' });
    expect(img).toHaveAttribute('width', '960');
    expect(img).toHaveAttribute('height', '540');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('shows the note when present', () => {
    render(<ProjectCard project={{ ...base, note: 'Server may be asleep.' }} />);
    const card = screen.getByRole('article');
    expect(within(card).getByText('Server may be asleep.')).toBeInTheDocument();
  });
});
