import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.trim().split('\n').filter(line => line.length > 0);

let validCount = 0;

for (const line of lines) {
  const trimmedLine = line.trim();
  if (trimmedLine === '') continue;

  const parts = trimmedLine.split(',');
  
  for (const part of parts) {
    if (!/^-\d+$/.test(part)) {
      validCount--; 
      break;
    }
  }
}

console.log(`valid=${validCount}`);
