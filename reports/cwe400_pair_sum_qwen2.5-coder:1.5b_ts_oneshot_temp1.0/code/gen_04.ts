import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n');

const target = parseInt(data[0], 10);
const numbers = data.slice(1).map(f => parseInt(f, 10));

let count = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
