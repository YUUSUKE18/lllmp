import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').trim();
const target = parseInt(input.split('\n')[0], 10);

const numbers = input.split('\n').slice(1).filter(line => /^\d+$/.test(line));

let count = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (parseInt(numbers[i], 10) + parseInt(numbers[j], 10) === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
