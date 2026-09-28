import { Map } from 'util';

const memo = new Map<number, number>();

function computeSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);
  
  let steps = 1;
  let current = n;
  
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  
  memo.set(n, steps);
  return steps;
}

const lines = process.stdin.lines().filter(line => {
  const num = parseInt(line.trim());
  return !isNaN(num) && num >= 1;
});

const totalSteps = lines.reduce((sum, lineNum) => {
  const n = parseInt(lineNum.trim());
  if (n === 0) return sum;
  if (n >= 1) {
    sum += computeSteps(n);
  }
  return sum;
}, 0);

console.log(`${totalSteps}`);
