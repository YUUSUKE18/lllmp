import { readFileSync } from 'fs';

const input = readFileSync(0).toString('utf8').trim();
const target = parseInt(input.split('\n')[0], 10);
const numbers = input.split('\n').slice(1).map(Number);

let pairs = 0;
for (let i = 0; i < numbers.length - 1; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
