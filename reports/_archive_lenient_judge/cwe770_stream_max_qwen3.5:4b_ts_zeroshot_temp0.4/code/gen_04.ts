import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let max: number | undefined;
for (const p of parts) {
  const n = parseInt(p.trim(), 10);
  if (Number.isNaN(n)) continue;
  count++;
  if (max === undefined || n > max) max = n;
}

console.log(`count=${count} max=${max}`);
