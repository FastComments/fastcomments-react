#!/usr/bin/env node
// Builds the canonical static demo for fastcomments-react (example-showcase).
// Output ends up at <repo-root>/demo-dist/. CRA `homepage: "."` produces
// relative URLs so the bundle works under any path prefix.
import { execSync } from 'node:child_process';
import { rmSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DEMO_DIR = resolve(ROOT, 'examples/example-showcase');
const OUT = resolve(ROOT, 'demo-dist');

const sh = (cmd, cwd = ROOT) => {
    console.log('$', cmd, `(${cwd})`);
    execSync(cmd, { stdio: 'inherit', cwd });
};

sh('npm ci');
sh('npm run build', DEMO_DIR);

rmSync(OUT, { recursive: true, force: true });
renameSync(resolve(DEMO_DIR, 'build'), OUT);
console.log('Built fastcomments-react demo at', OUT);
