import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf-8').split('\n');

const target = parseInt(data[0], 10);

const numbers = data.slice(1).filter(Number).sort((a, b) => a - b);

let count = 0;

for (let i = 0; i < numbers.length - 1; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
