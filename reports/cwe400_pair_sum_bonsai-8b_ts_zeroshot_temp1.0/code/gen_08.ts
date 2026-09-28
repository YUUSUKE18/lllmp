import { Readable, ReadTextEvent } from 'readable';

const input = process.stdin.readText();

let lines = input.split('\n');
let numbers = [];

for (let line of lines) {
  if (line.trim() === '') continue;
  const parts = line.trim().split(/\s+/);
  if (parts.length === 0) continue;
  const value = parseInt(parts[0], 10);
  if (!isNaN(value)) numbers.push(value);
}

const count = 0;
const n = numbers.length;

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (numbers[i] + numbers[j] === numbers[lines.length - 1]) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
