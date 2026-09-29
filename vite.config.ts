/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Content Security Policy. GitHub Pages cannot send response headers, so the
// policy ships as a <meta http-equiv> tag. It is injected only into the
// production build: Vite's dev server relies on inline <style> tags for HMR,
// which this policy (correctly) forbids. See the README for the rationale
// behind each directive.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

const CSP_PLACEHOLDER = '<!-- CSP (injected at build time) -->';

function cspMeta(): Plugin {
  return {
    name: 'inject-csp-meta',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      // Replaces the placeholder comment right after <meta charset>, so the
      // policy is in force before any script or stylesheet is parsed.
      handler: (html) => {
        if (!html.includes(CSP_PLACEHOLDER)) throw new Error('CSP placeholder missing from index.html');
        return html.replace(CSP_PLACEHOLDER, `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`);
      },
    },
  };
}

export default defineConfig({
  // User site (rdbagwell.github.io), served from the domain root.
  base: '/',
  plugins: [react(), tailwindcss(), cspMeta()],
  build: {
    target: 'es2022',
    // Vite would otherwise inline small assets as data: URIs, which the CSP blocks.
    assetsInlineLimit: 0,
    // The lazily loaded three.js chunk (~135 kB gzipped) is expected to be large;
    // the initial bundle stays well under this.
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
