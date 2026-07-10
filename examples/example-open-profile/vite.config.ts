import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev demo build. base './' keeps asset URLs relative so the bundle works under
// any path prefix (mirrors the old CRA `homepage: "."`). outDir 'build' keeps
// build-demo.mjs's rename step working.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
