import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  { encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean);
const forbiddenPath =
  /(^|\/)(?:\.env(?:\..+)?|\.npmrc|\.aws|\.ssh|secrets|credentials|backups?|private|sensitive|exports|data)(?:\/|$)|\.(?:pem|key|p12|pfx|sqlite3?|db|sql|dump|bak|backup|zip|7z)$/i;
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /AKIA[A-Z0-9]{16}/,
  /eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/,
];
let links = 0;
for (const file of files) {
  if (file !== '.env.example' && forbiddenPath.test(file))
    throw new Error(`Arquivo sensivel versionavel: ${file}`);
  if (/\.(png|jpg|jpeg|webp|ico)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  if (secretPatterns.some((pattern) => pattern.test(text)))
    throw new Error(`Possivel segredo em ${file}; revise sem imprimir o conteudo.`);
  if (file.endsWith('.md'))
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^(https?:|mailto:)/.test(target)) continue;
      if (!existsSync(resolve(dirname(file), decodeURIComponent(target))))
        throw new Error(`Link quebrado: ${file} -> ${target}`);
      links++;
    }
}
const template = readFileSync('.env.example', 'utf8');
if (
  template
    .split(/\r?\n/)
    .some((line) => line.trim() && !line.trim().startsWith('#') && !/^[A-Z_]+=$/.test(line))
)
  throw new Error('Template .env.example contem valor ou linha inesperada.');
const blocked = [
  '.env',
  '.env.production',
  'nested/.env.local',
  'secrets/key.txt',
  'backups/clients.csv',
  'data/clients.json',
  'exports/clients.csv',
  'credentials/token.json',
  '.aws/credentials',
  '.ssh/id_rsa',
  'private/client.csv',
  'sensitive/data.csv',
  'dump.sql',
  'dump.sql.gz',
  'client.sqlite3',
  'cert.pem',
  'cert.key',
  'copy.bak',
  'copy.zip',
];
const ignoredCount = execFileSync('git', ['check-ignore', '--no-index', '--stdin'], {
  input: blocked.join('\n') + '\n',
  encoding: 'utf8',
})
  .split(/\r?\n/)
  .filter(Boolean).length;
if (ignoredCount !== blocked.length) throw new Error('Regra de exclusao ausente.');
console.log(
  `Repositorio: ${files.length} arquivos revisados, ${links} links locais validos, ${blocked.length} exclusoes confirmadas. Sem padroes conhecidos de segredo. Revisao humana continua necessaria.`,
);
