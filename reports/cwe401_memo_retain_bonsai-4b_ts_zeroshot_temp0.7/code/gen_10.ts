const input = process.stdin.readSync().trim().split(/\r\n/).filter(line => line.length > 0 && !isNaN(line));
const memo = new Map<number, number>();

function getSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);
  
  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  
  const steps = 1 + getSteps(next);
  memo.set(n, steps);
  
  return steps;
}

const totalSteps = input
  .map(Number)
  .filter(n => n > 0)
  .reduce((sum, n) => sum + getSteps(n), 0);

console.log(`total=${totalSteps}`);
