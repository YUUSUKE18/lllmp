const input = process.stdin.readSync().trim();
const numbers = input.split(/\s+/).filter(Number.isInteger);

const memo = new Map<number, number>([]);

function calculateSteps(n: number): number {
  if (n === 1) return 0;
  if (n % 2 === 0) {
    const steps = 1 + calculateSteps(n / 2);
  } else {
    const steps = 1 + calculateSteps(3 * n + 1);
  }
  memo.set(n, steps);
  return memo.get(n) ?? steps;
}

const totalSteps = numbers.reduce((sum, n) => {
  if (!n) return sum;
  const steps = calculateSteps(n);
  return sum + steps;
}, 0);

console.log(`total=${totalSteps}`);
