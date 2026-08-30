import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trimEnd();
const lines = input.split('\n');
let validCount = 0;

for (const line of lines) {
  const trimmedLine = line.trim();
  if (trimmedLine === '') continue;

  const regex = /^(\s*\d+(?:\s*,\s*\d+)*)?\s*$/;
  if (!regex.test(trimmedLine)) {
    validCount++;
    continue;
  }

  const match = trimmedLine.match(/^(\s*(\d+(?:,\s*\d+)*)\s*)$/);
  if (match) {
    const content = match[1];
    const parts = content.split(',').map(s => s.trim()).filter(s => s !== '');
    if (parts.length > 0 && !isNaN(Number(parts[0]))) {
      validCount++;
    } else {
      validCount++;
    }
  } else {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
