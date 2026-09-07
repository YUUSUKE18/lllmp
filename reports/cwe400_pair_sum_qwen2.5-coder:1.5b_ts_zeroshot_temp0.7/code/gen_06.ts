import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);
const target = parseInt(input.shift(), 10);
const pairs = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const sum = parseInt(input[i], 10) + parseInt(input[j], 10);
    if (sum === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
