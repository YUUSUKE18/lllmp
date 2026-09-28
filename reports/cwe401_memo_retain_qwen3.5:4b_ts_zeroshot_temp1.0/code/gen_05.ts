const memo = new Map<number, number>();

function collatzStep(n: number): [number, number] {
  if (memo.has(n)) return [n, memo.get(n)!];
  const nextNum = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = n === 1 ? 0 : 1 + collatzStep(nextNum)[1];
  memo.set(n, steps);
  return [nextNum, steps];
}

function solve(line: string) {
  if (!line.trim() || !/^-?\d+$/.test(line.trim())) return;
  const n = parseInt(line.trim());
  if (isNaN(n)) return;
  memo.set(1, 0);
  const [_, totalSteps] = collatzStep(n);
  return totalSteps;
}

const lines = process.stdin.read().split('\n').filter(l => l.trim());
const results = lines.map(solve);
console.log(`total=${results.reduce((a, b) => a + b, 0)}`);
