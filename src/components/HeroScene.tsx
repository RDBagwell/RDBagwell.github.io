import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
} from 'three';

type Props = { onError: () => void };

/**
 * A procedurally generated low-poly gem with a few orbiting shards. No
 * models, textures or audio are loaded. Rendering pauses while the canvas is
 * off-screen or the tab is hidden.
 */
export default function HeroScene({ onError }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onError = () => onErrorRef.current();

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      onError();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const geometries: BufferGeometry[] = [];
    const materials: Material[] = [];
    const track = <G extends BufferGeometry, M extends Material>(g: G, m: M) => {
      geometries.push(g);
      materials.push(m);
      return [g, m] as const;
    };

    // Main gem: a lightly jittered icosahedron, flat shaded.
    const gemGeo = new IcosahedronGeometry(1.6, 1);
    const pos = gemGeo.getAttribute('position');
    const seen = new Map<string, number>();
    for (let i = 0; i < pos.count; i++) {
      // Jitter shared vertices by the same amount so faces stay closed.
      const key = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`;
      let s = seen.get(key);
      if (s === undefined) {
        s = 0.9 + Math.random() * 0.2;
        seen.set(key, s);
      }
      pos.setXYZ(i, pos.getX(i) * s, pos.getY(i) * s, pos.getZ(i) * s);
    }
    gemGeo.computeVertexNormals();
    const [, gemMat] = track(
      gemGeo,
      new MeshStandardMaterial({ color: new Color('#6366f1'), flatShading: true, roughness: 0.45, metalness: 0.2 }),
    );
    const gem = new Mesh(gemGeo, gemMat);
    const [edgesGeo, edgesMat] = track(
      new EdgesGeometry(gemGeo),
      new LineBasicMaterial({ color: new Color('#c7d2fe'), transparent: true, opacity: 0.55 }),
    );
    gem.add(new LineSegments(edgesGeo, edgesMat));

    // Orbiting shards.
    const shards = new Group();
    const [shardGeo, shardMat] = track(
      new OctahedronGeometry(0.18, 0),
      new MeshStandardMaterial({ color: new Color('#a78bfa'), flatShading: true, roughness: 0.4 }),
    );
    const shardData = Array.from({ length: 7 }, (_, i) => ({
      radius: 2.3 + (i % 3) * 0.35,
      speed: 0.25 + (i % 4) * 0.08,
      phase: (i / 7) * Math.PI * 2,
      tilt: (i % 2 ? 1 : -1) * (0.3 + i * 0.05),
      mesh: new Mesh(shardGeo, shardMat),
    }));
    shardData.forEach((s) => shards.add(s.mesh));

    const root = new Group();
    root.add(gem, shards);
    scene.add(root);

    scene.add(new AmbientLight(0xffffff, 0.9));
    const key = new DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new PointLight(0xa78bfa, 25, 20);
    rim.position.set(-4, -2, 2);
    scene.add(rim);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let frame = 0;
    let last = performance.now();
    let t = 0;
    let onScreen = true;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      t += dt;
      gem.rotation.y += dt * 0.25;
      gem.rotation.x = Math.sin(t * 0.3) * 0.25;
      root.position.y = Math.sin(t * 0.8) * 0.12;
      for (const s of shardData) {
        const a = s.phase + t * s.speed;
        s.mesh.position.set(Math.cos(a) * s.radius, Math.sin(a) * s.radius * s.tilt, Math.sin(a) * s.radius * 0.6);
        s.mesh.rotation.x += dt;
        s.mesh.rotation.y += dt * 1.3;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || !onScreen || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      onError();
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full animate-[fade-in_600ms_ease-out]" />;
}
