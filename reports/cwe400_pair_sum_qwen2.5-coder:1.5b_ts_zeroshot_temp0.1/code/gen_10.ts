import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

const target = parseInt(input[0], 10);
const numbers = input.slice(1).map(Number);

let count = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
