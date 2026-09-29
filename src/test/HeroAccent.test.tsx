import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HeroAccent from '../components/HeroAccent';
import { mockMatchMedia } from './setup';

vi.mock('../components/HeroScene', () => ({
  default: () => <canvas data-testid="hero-scene" />,
}));

function stubWebGL() {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as RenderingContext);
}

async function flushIdle() {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 300));
  });
}

describe('HeroAccent', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders the static fallback when reduced motion is set', async () => {
    stubWebGL();
    mockMatchMedia(['(prefers-reduced-motion: reduce)', '(min-width: 768px)']);
    render(<HeroAccent />);
    await flushIdle();
    expect(screen.getByTestId('hero-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('hero-scene')).not.toBeInTheDocument();
  });

  it('renders the static fallback on small screens', async () => {
    stubWebGL();
    mockMatchMedia([]);
    render(<HeroAccent />);
    await flushIdle();
    expect(screen.getByTestId('hero-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('hero-scene')).not.toBeInTheDocument();
  });

  it('loads the 3D scene on wide screens with motion allowed and WebGL', async () => {
    stubWebGL();
    mockMatchMedia(['(min-width: 768px)']);
    render(<HeroAccent />);
    expect(screen.getByTestId('hero-fallback')).toBeInTheDocument();
    await flushIdle();
    expect(await screen.findByTestId('hero-scene')).toBeInTheDocument();
  });
});
