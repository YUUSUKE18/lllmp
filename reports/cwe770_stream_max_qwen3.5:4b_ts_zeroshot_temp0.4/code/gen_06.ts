import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let maxVal: number | undefined;
for (const part of parts) {
  const val = parseInt(part.trim(), 10);
  if (!isNaN(val)) {
    count++;
    if (maxVal === undefined || val > maxVal) {
      maxVal = val;
    }
  }
}

console.log(`count=${(count as number)} max=${maxVal}`);
