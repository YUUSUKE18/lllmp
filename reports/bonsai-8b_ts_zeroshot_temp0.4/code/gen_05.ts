import { Readable, ReadTextEvent, ReadableStream } from 'stream';

const input = ReadableStream.from(process.stdin);

let count = 0;
let sum = 0;
let seen = new Set<number>();

for await (const line of input) {
  const numbers = line.strip().split(',').map(Number);
  for (const num of numbers) {
    if (isNaN(num)) continue;
    if (seen.has(num)) continue;
    seen.add(num);
    count++;
    sum += num;
  }
}

console.log(`count=${count} sum=${sum}`);
