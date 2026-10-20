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

console.log(`count=${count} sum=${sum}`);
