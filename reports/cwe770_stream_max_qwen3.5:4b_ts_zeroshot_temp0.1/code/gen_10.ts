import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let max: number | null = null;
for (const part of parts) {
  const num = parseInt(part.trim(), 10);
  if (!isNaN(num)) {
    count++;
    if (max === null || num > max) {
      max = num;
    }
  }
}

console.log(`count=${count} max=${max}`);
