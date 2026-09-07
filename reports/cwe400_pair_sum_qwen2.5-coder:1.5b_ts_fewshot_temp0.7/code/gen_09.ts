import { readFileSync } from 'fs';

const input = readFileSync(process.stdin.fd, 'utf8');
const target = parseInt(input.split('\n')[0]);
const numbers = input.split('\n').slice(1).map(Number);

let count = 0;
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    const sum = numbers[i] + numbers[j];
    if (sum === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
