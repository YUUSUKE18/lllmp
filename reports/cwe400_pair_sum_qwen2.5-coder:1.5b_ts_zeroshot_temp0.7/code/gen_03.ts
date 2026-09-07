import { readLines } from 'fs';

readLines(process.stdin)
  .filter(line => !line.trim().startsWith('#'))
  .map(Number)
  .forEach((num, index) => {
    const remaining = num % 2 !== 0 ? num + 1 : num;
    const pairs = (num + remaining) / 2;
    console.log(`pairs=${pairs}`);
  });
