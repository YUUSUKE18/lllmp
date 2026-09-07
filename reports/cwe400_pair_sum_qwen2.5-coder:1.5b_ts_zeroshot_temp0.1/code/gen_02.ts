import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf-8').trim();
const target = parseInt(input, 10);

const numbers = input.split('\n').slice(1).map(Number);

let count = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
