import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  // react and lodash are peerDependencies and are auto-externalized by tsup.
  // fastcomments-typescript is a devDependency and is intentionally bundled,
  // matching the previous microbundle-crl output.
});
