import { Readable } from 'stream';

const input = Readable.from(process.stdin);

let count = 0;
let sum = 0;
const seen = new Set<number>();

input.on('line', line => {
  const numbers = line.trim().split(/\s+/);
  numbers.forEach(num => {
    const numInt = parseInt(num, 10);
    if (!isNaN(numInt) && !seen.has(numInt)) {
      seen.add(numInt);
      count++;
      sum += numInt;
    }
  });
});

input.on('end', () => {
  console.log(`count=${count} sum=${sum}`);
});
