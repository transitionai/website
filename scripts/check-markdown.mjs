import assert from 'node:assert/strict';
import { readFile, readdir, rm, cp, mkdtemp, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { once } from 'node:events';

const root = process.cwd();
const out = path.join(root, 'out');
async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(filename));
    else result.push(filename);
  }
  return result;
}
function decodeHtml(text) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, value) => {
    if (!value.startsWith('#')) return named[value.toLowerCase()] ?? entity;
    const code = value[1].toLowerCase() === 'x' ? parseInt(value.slice(2), 16) : Number(value.slice(1));
    return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}
const targets = new Map();
for (const filename of await files(out)) {
  if (!filename.endsWith('.html')) continue;
  const html = await readFile(filename, 'utf8');
  const links = [...html.matchAll(/href="(\/llms\.mdx\/approach\/[^"?#]+)"/g)].map(match => match[1]);
  if (!links.length) continue;
  const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, '');
  assert.ok(title, `Missing page title: ${filename}`);
  for (const url of links) {
    const text = await readFile(path.join(out, url.slice(1)), 'utf8');
    assert.ok(text.startsWith(`# ${decodeHtml(title)}\n`), `Wrong Markdown document: ${url}`);
    assert.ok(text.includes('Canonical: https://transitioned.dev/approach'), `Missing canonical source: ${url}`);
    assert.ok(!text.includes('<!DOCTYPE html>'), `HTML error document exported at ${url}`);
    targets.set(url, text);
  }
}
assert.ok(targets.has('/llms.mdx/approach/index'), 'The approach Markdown link is missing.');
assert.ok(targets.has('/llms.mdx/approach/design-questions'), 'The design questions Markdown link is missing.');
console.log(`Verified ${targets.size} Markdown links and exported documents.`);

if (process.argv.includes('--live')) {
  // A separate project copy isolates Next/MDX writes to tsconfig and generated files.
  const socket = net.createServer();
  socket.listen(0, '127.0.0.1');
  await once(socket, 'listening');
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const project = await mkdtemp(path.join(tmpdir(), 'transition-route-check-'));
  const excluded = new Set(['node_modules', 'out', '.next', '.git', '.next-route-check']);
  try {
    for (const entry of await readdir(root, { withFileTypes: true })) {
      if (excluded.has(entry.name) || entry.name.startsWith('.env')) continue;
      await cp(path.join(root, entry.name), path.join(project, entry.name), { recursive: true });
    }
    await symlink(path.join(root, 'node_modules'), path.join(project, 'node_modules'), 'dir');
  } catch (error) {
    await rm(project, { recursive: true, force: true });
    throw error;
  }
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--webpack', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: project, env: { ...process.env }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  child.stdout.on('data', data => { logs = (logs + data).slice(-8000); });
  child.stderr.on('data', data => { logs = (logs + data).slice(-8000); });
  const origin = `http://127.0.0.1:${port}`;
  try {
    const deadline = Date.now() + 60000;
    let ready = false;
    while (Date.now() < deadline && child.exitCode === null) {
      try { ready = (await fetch(origin, { signal: AbortSignal.timeout(3000) })).ok; } catch {}
      if (ready) break;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    assert.ok(ready, `Route-check server failed to start.\n${logs}`);
    for (const [url, expected] of targets) {
      const response = await fetch(origin + url, { signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, `${url} returned ${response.status}`);
      assert.match(response.headers.get('content-type') ?? '', /^text\/plain\b/, `${url} must open as readable text`);
      assert.equal(await response.text(), expected, `Live Markdown differs from export: ${url}`);
    }
    const missing = await fetch(origin + '/llms.mdx/approach/nonexistent-note', { signal: AbortSignal.timeout(15000) });
    assert.equal(missing.status, 404, 'Unknown research notes must return 404.');
    console.log(`Verified ${targets.size} live Markdown routes and the unknown-note 404.`);
  } finally {
    if (child.exitCode === null) {
      const stopped = once(child, 'exit');
      child.kill('SIGTERM');
      const force = setTimeout(() => child.kill('SIGKILL'), 5000);
      await stopped;
      clearTimeout(force);
    }
    await rm(project, { recursive: true, force: true });
  }
}
