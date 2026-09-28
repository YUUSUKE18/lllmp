import { readFileSync } from 'fs';

const lines = readFileSync(process.stdin.fd, 'utf8').split('\n');

const target = parseInt(lines[0], 10);
const numbers = lines.slice(1).filter(line => !line.trim().startsWith('#'));

let count = 0;
for (let i = 0; i < numbers.length; i++) {
  const num1 = parseInt(numbers[i], 10);
  for (let j = i + 1; j < numbers.length; j++) {
    const num2 = parseInt(numbers[j], 10);
    if (num1 + num2 === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
