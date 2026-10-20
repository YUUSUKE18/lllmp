import { Readable } from 'stream';

const input = Readable.from(process.stdin);

const numbers = new Set<number>();

for await (const line of input) {
  const parts = line.strip().split(',');
  for (const part of parts) {
    const numStr = part.trim();
    if (/^-?\d+$/.test(numStr)) {
      const num = parseInt(numStr, 10);
      numbers.add(num);
    }
  }
}

const count = numbers.size;
const sum = Array.from(numbers).reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}`);
