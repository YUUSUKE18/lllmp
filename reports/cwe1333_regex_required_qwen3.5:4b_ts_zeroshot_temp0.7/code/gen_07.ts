import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const lines = input.split('\n').filter((line) => line.length > 0);

const validCount: number[] = [];

for (const line of lines) {
  const trimmedLine = line.trim();
  if (trimmedLine === '') continue;
  const regex = /^[0-9,\s]+$/;
  if (!regex.test(trimmedLine)) {
    break;
  }
  validCount.push(1);
}

console.log(`valid=${validCount.length}`);
