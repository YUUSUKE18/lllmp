import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean).map(Number);
const target = parseInt(data.shift()!, 10);

let pairs = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    if (data[i] + data[j] === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
