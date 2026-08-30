import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let max: number | null = null;
for (const part of parts) {
  const val = parseInt(part.trim(), 10);
  if (!isNaN(val)) {
    count++;
    if (max === null || val > max) {
      max = val;
    }
  }
}

console.log(`count=${count} max=${max}`);
