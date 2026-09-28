import { readFileSync } from 'fs';

const targetValue = parseInt(readFileSync('input.txt', 'utf-8').trim(), 10);

let count = 0;

for (let i = 0; i < targetValue; i++) {
  for (let j = i + 1; j < targetValue; j++) {
    if (i + j === targetValue) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
