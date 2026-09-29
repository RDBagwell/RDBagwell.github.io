import { lazy, Suspense, useEffect, useState } from 'react';
import HeroFallback from './HeroFallback';
import { useMediaQuery } from './useMediaQuery';

// Code-split: three.js is only downloaded when the scene is actually shown.
// If the chunk fails to load, quietly keep the static fallback.
const HeroScene = lazy(() =>
  import('./HeroScene').catch(() => ({ default: (_: { onError: () => void }) => <HeroFallback /> })),
);

let webglSupport: boolean | undefined;
function hasWebGL(): boolean {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement('canvas');
      webglSupport = !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

/** Resolves once the page has loaded and the main thread is idle. */
function whenIdle(cb: () => void): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = () => {
    if (cancelled) return;
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(cb, { timeout: 2000 });
    else timer = setTimeout(cb, 200);
  };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener('load', run);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timer !== undefined) clearTimeout(timer);
  };
}

/**
 * Decorative 3D accent for the hero. Shows the static fallback when the viewer
 * prefers reduced motion, on small screens, without WebGL, or until the page
 * is idle — then swaps in the lazily loaded three.js scene.
 */
export default function HeroAccent() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const wideEnough = useMediaQuery('(min-width: 768px)');
  const [idle, setIdle] = useState(false);
  const [failed, setFailed] = useState(false);

  const allowed = !reducedMotion && wideEnough && !failed;

  useEffect(() => {
    if (!allowed || idle) return;
    return whenIdle(() => setIdle(true));
  }, [allowed, idle]);

  const show3D = allowed && idle && hasWebGL();

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-64 sm:max-w-sm md:max-w-md">
      {show3D ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroScene onError={() => setFailed(true)} />
        </Suspense>
      ) : (
        <HeroFallback />
      )}
    </div>
  );
}
