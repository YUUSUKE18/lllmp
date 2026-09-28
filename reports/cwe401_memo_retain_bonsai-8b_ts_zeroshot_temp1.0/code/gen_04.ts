import { Readable } from 'stream';

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

function collate(n: number): number {
  if (n < 0) return n;
  const result = n.toString();
  let resultNumber = parseInt(result, 10);
  if (isNaN(resultNumber)) return resultNumber;
  return resultNumber;
}

function steps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n) || steps(n);
  
  let stepsCount = 0;
  let current = n;
  
  while (current !== 1) {
    current = collate(current);
    stepsCount++;
  }
  
  memo.set(n, stepsCount);
  return stepsCount;
}

let total = 0;
let line = '';

for ({ value, line }) of input.entries() {
  const n = collate(line.trim());
  if (n === 1) continue;
  
  const steps = steps(n);
  total += steps;
  
  line = '';
}

console.log(`total=${total}`);
