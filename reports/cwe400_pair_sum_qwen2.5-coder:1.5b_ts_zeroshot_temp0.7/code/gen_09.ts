import { readFileSync } from 'fs';

const values = readFileSync('/dev/stdin', 'utf-8').trim().split('\n').map(Number);
const targetSum = values[0];

const pairs = values.slice(1).reduce((acc, value, index) => {
  const remainingSum = targetSum - value;
  if (acc.has(remainingSum)) {
    acc.set(remainingSum, acc.get(remainingSum) + 1);
  } else {
    acc.set(remainingSum, 1);
  }
  return acc;
}, new Map<number, number>()).get(targetSum) || 0;

console.log(`pairs=${pairs}`);
