import { readFileSync } from 'fs';

const targetValue = parseInt(readFileSync('input.txt', 'utf8').trim(), 10);

const numbers: number[] = [];
let count = 0;

for (const line of readFileSync('input.txt', 'utf8').split('\n').slice(1)) {
  const num = parseInt(line.trim(), 10);
  if (!Number.isNaN(num)) {
    numbers.push(num);
    if (numbers.length >= 2) {
      if (numbers[0] + numbers[1] === targetValue) {
        count++;
      }
      numbers.shift();
    }
  }
}

console.log(`pairs=${count}`);
