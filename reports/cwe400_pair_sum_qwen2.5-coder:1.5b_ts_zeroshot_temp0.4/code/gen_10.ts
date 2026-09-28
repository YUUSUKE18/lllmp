import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8');
const [target, ...numbers] = input.split('\n').filter(Boolean);

const pairsCount = numbers.reduce((count, num, index) => {
  const remaining = target - num;
  const remainingIndex = numbers.indexOf(remaining, index + 1);
  if (remainingIndex !== -1) {
    count++;
  }
  return count;
}, 0);

console.log(`pairs=${pairsCount}`);
