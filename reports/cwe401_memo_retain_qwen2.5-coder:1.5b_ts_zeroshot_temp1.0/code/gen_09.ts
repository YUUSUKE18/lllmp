const input = require('fs').readFileSync('/dev/stdin', 'utf-8');
const queries = input.split('\n');

const memo = new Map<number, number>();

function calculateSteps(n: number): number {
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  let steps = 0;
  while (n !== 1) {
    steps++;
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }
  memo.set(n, steps);
  return steps;
}

const totalSteps = queries.reduce((total, query) => {
  const number = parseInt(query, 10);
  if (number > 0) {
    const steps = calculateSteps(number);
    total += steps;
  }
  return total;
}, 0);

console.log(`total=${totalSteps}`);
