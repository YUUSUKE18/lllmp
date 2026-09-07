import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8');
const lines = input.split('\n');
const target = parseInt(lines[0], 10);

let count = 0;
for (let i = 1; i < lines.length; i++) {
  for (let j = i + 1; j < lines.length; j++) {
    const sum = parseInt(lines[i], 10) + parseInt(lines[j], 10);
    if (sum === target) count++;
  }
}

console.log(`pairs=${count}`);
