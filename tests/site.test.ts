import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const generator = path.resolve('scripts/new-post.mjs');
test('post generator rejects traversal and refuses to overwrite an existing draft', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'krishi-post-'));
  try {
    const run = (...args: string[]) => spawnSync(process.execPath, [generator, ...args], { cwd, encoding: 'utf8' });
    assert.equal(run('../escape').status, 1);
    assert.equal(run('my-post', 'A "quoted" title').status, 0);
    const file = path.join(cwd, 'content/posts/my-post/index.mdx');
    const before = fs.readFileSync(file, 'utf8');
    assert.match(before, /draft: true/);
    assert.match(before, /title: "A \\"quoted\\" title"/);
    assert.equal(run('my-post', 'Overwrite').status, 1);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
  } finally { fs.rmSync(cwd, { recursive: true, force: true }); }
});
test('production output has portable pages and excludes unpublished routes', () => {
  assert.ok(fs.existsSync('dist/index.html'), 'Run npm run build before npm test');
  assert.ok(fs.existsSync('dist/blog/index.html'));
  assert.ok(fs.existsSync('dist/404.html'));
  for (const slug of ['writing-lab', 'napa', 'taking-the-fall-off']) assert.equal(fs.existsSync(`dist/blog/${slug}/index.html`), false);
  const homepage = fs.readFileSync('dist/index.html', 'utf8');
  assert.match(homepage, /blank-home/);
  assert.doesNotMatch(homepage, /_next\/|react-dom|Local drafts/);
  assert.doesNotMatch(fs.readFileSync('dist/blog/index.html', 'utf8'), /writing-lab|Local drafts/);
});
