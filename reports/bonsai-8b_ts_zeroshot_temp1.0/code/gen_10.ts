import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const nums = line.trim().split(',').map(Number);
  const seen = new Set();
  let count = 0;
  let sum = 0;

  for (const num of nums) {
    if (isNaN(num)) continue;
    if (!seen.has(num)) {
      seen.add(num);
      count++;
      sum += num;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
