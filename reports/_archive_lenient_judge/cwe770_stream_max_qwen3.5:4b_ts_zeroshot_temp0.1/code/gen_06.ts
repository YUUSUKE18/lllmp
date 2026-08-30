import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let maxVal: number | null = null;
for (const part of parts) {
  const num = parseInt(part.trim(), 10);
  if (!isNaN(num)) {
    count++;
    if (maxVal === null || num > maxVal) {
      maxVal = num;
    }
  }
}

console.log(`count=${count} max=${maxVal}`);
