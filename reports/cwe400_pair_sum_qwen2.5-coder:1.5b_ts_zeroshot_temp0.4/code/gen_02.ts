import { readFileSync } from 'fs';

const target = parseInt(readFileSync('input.txt', 'utf8').trim(), 10);

let count = 0;

for (let i = 0; i < process.stdin.readableLength; i++) {
  const line = process.stdin.read().trim();
  if (line === '') continue;
  const num = parseInt(line, 10);
  if (num === target) continue;

  for (let j = i + 1; j < process.stdin.readableLength; j++) {
    const nextLine = process.stdin.read().trim();
    if (nextLine === '') continue;
    const nextNum = parseInt(nextLine, 10);
    if (nextNum === target - num) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
