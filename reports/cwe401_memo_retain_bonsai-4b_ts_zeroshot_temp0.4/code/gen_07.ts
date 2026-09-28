const input = process.stdin;
const memo = new Map<number, number>();

const solve(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);

  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = 1 + solve(next);
  memo.set(n, steps);
  return steps;
}

let totalSteps = 0;

input.on('line-end', () => {
  const line = input.readline();
  if (!line) return;

  const tokens = line.trim().split(/\s+/).filter(token => token.isdigit());
  if (tokens.length === 0) return;

  const nums = tokens.map(Number);
  nums.forEach(n => {
    if (n < 1) return;
    totalSteps += solve(n);
  });
});

process.exit(0);
