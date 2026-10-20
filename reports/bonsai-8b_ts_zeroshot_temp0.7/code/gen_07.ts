import { Readable } from 'stream';

const input = Readable.from(process.stdin);

const uniqueNumbers = new Set<number>();
let total = 0;

for await (const value of input) {
  const numStr = value.trim();
  if (/^-?\d+$/.test(numStr)) {
    const num = parseInt(numStr, 10);
    if (!uniqueNumbers.has(num)) {
      uniqueNumbers.add(num);
      total += num;
    }
  }
}

const count = uniqueNumbers.size;
const sum = total;

console.log(`count=${count} sum=${sum}`);
