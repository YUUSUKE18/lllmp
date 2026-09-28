import { readFileSync } from 'fs';

const target = parseInt(readFileSync('/dev/stdin', 'utf8').trim(), 10);

let pairs = 0;
let prev: number | null = null;

for (const line of readFileSync('/dev/stdin', 'utf8').split('\n').slice(1)) {
  const num = parseInt(line.trim(), 10);
  if (prev !== null && num + prev === target) pairs++;
  prev = num;
}

console.log(`pairs=${pairs}`);
