import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';

const files = [
  '/index.html',
  '/manifest.webmanifest',
  '/icons/app-192.png',
  '/icons/app-512.png',
  '/icons/app-maskable-512.png',
  ...(await readdir('dist/assets')).map((name) => `/assets/${name}`),
];
const hash = createHash('sha256');
for (const file of files) hash.update(await readFile(`dist${file}`));
const template = await readFile('src/shared/pwa/sw-template.js', 'utf8');
hash.update(template);
const version = hash.digest('hex').slice(0, 16);
await writeFile(
  'dist/sw.js',
  template
    .replace('__CACHE_VERSION__', version)
    .replace("'__PRECACHE_FILES__'", JSON.stringify(files)),
);
console.log(
  `PWA: ${files.length} arquivos estaticos, versao ${version}. Sem cache de APIs ou dados.`,
);
