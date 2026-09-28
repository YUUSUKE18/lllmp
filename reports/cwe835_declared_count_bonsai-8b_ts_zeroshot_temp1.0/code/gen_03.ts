import { Readable } from 'stream';

const input = process.stdin.readable();
const counts = {};
let sum = 0;
let actualCount = 0;

input.on('line', (line) => {
  const numbers = line.match(/\d+/g) || [];
  const numCount = numbers.length;

  if (numCount === 0) return;

  actualCount += numCount;

  for (const num of numbers) {
    const n = parseInt(num, 10);
    if (n < 0 || n > 9223372036854775807) continue;
    sum += n;
    counts[num] = (counts[num] || 0) + 1;
  }
});

input.on('end', () => {
  const realCount = actualCount;
  const realSum = sum;

  if (realCount === 0) {
    process.stdout.write('\n');
    return;
  }

  process.stdout.write(`count=${realCount} sum=${realSum}\n`);
});
