import { Readable, ReadText } from 'stream';

const input = process.stdin.readText();

const elements = input
  .split(',')
  .filter(e => e.trim() !== '')
  .map(e => e.trim().split(':'))
  .filter(([val, count]) => val && count);

let count = 0;
let sum = 0;

for (const [val, count] of elements) {
  const num = parseInt(val, 10);
  if (isNaN(num)) continue;
  count += parseInt(count, 10);
  sum += num * count;
}

console.log(`count=${count} sum=${sum}`);
