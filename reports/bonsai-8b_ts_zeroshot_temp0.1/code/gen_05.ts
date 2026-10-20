import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const result = ReadText({ encoding: 'utf-8' }).pipe(input);

let numbers = new Set<number>();
let count = 0;
let sum = 0;

for await (const line of result) {
  const parts = line.trim().split(',');
  for (const part of parts) {
    const numStr = part.trim();
    if (/^-?\d+$/.test(numStr)) {
      const num = parseInt(numStr, 10);
      numbers.add(num);
      count++;
      sum += num;
    }
  }
}

const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
const uniqueCount = sortedNumbers.length;
const uniqueSum = sortedNumbers.reduce((acc, num) => acc + num, 0);

console.log(`count=${uniqueCount} sum=${uniqueSum}`);
