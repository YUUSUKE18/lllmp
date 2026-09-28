const memo = new Map<number, number>();

function calculateSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? calculateSteps(n / 2) + 1 : calculateSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

let total = 0;

process.stdin.on('data', (data) => {
  const lines = data.toString().split('\n');

  lines.forEach((line) => {
    if (line.trim() !== '') {
      const n = parseInt(line, 10);
      total += calculateSteps(n);
    }
  });

  console.log(`total=${total}`);
});
