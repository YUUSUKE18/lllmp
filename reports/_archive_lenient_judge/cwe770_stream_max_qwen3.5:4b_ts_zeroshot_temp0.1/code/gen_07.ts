import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let maxVal: number | undefined;
for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    const val = parseInt(trimmed, 10);
    count++;
    if (!maxVal || val > maxVal) {
      maxVal = val;
    }
  }
}

console.log(`count=${count} max=${maxVal}`);
