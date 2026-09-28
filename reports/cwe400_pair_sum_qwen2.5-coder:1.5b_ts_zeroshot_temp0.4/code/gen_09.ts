import { readFileSync } from 'fs';

const target = parseInt(readFileSync('input.txt', 'utf-8').split('\n')[0], 10);

const numbers = readFileSync('input.txt', 'utf-8').split('\n').slice(1).map(Number);

let count = 0;

for (let i = 0; i < numbers.length - 1; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
