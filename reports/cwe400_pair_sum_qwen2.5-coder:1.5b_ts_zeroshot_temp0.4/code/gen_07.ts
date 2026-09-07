import { readFileSync } from 'fs';

const targetValue = parseInt(readFileSync('input.txt', 'utf-8').trim(), 10);

let pairsCount = 0;

for (let i = 0; i < targetValue; i++) {
  const num1 = parseInt(readFileSync('input.txt', 'utf-8').trim(), 10);
  for (let j = i + 1; j < targetValue; j++) {
    const num2 = parseInt(readFileSync('input.txt', 'utf-8').trim(), 10);
    if (num1 + num2 === targetValue) {
      pairsCount++;
    }
  }
}

console.log(`pairs=${pairsCount}`);
