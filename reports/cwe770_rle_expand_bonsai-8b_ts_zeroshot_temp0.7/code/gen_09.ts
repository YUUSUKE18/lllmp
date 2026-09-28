import { stdin, stdout } from 'process';

const input = stdin.read().trim();
const items = input.split(',');

let count = 0;
let sum = 0;

for (const item of items) {
  const [value, countStr] = item.split(':');
  const valueNum = parseInt(value, 10);
  const numCount = parseInt(countStr, 10);

  if (!isNaN(valueNum) && !isNaN(numCount) && numCount >= 0) {
    count += numCount;
    sum += valueNum * numCount;
  }
}

stdout.write(`count=${count} sum=${sum}\n`);
