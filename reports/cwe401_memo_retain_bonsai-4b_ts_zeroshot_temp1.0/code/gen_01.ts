const input = process.stdin;
const memo = new Map<string, number>();

const solve(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);

  let steps = 0;
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

let total = 0;
const lines = input-lines().map(line => {
  const num = parseInt(line.trim(), 10);
  if (isNaN(num) || num <= 0) return 0;
  return solve(num);
});

total += lines.reduce((a, b) => a + b, 0);

console.log(`total=${total}`);
