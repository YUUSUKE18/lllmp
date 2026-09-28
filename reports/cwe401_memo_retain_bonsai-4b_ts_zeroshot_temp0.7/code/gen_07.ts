const memo = new Map<number, number>([]);

const readInput = (): number[] => {
  const lines = process.stdin
    .pipe({ noDelay: true, crlf: true })
    .map(line => line.trim())
    .filter(line => !isNaN(line) && Number.isInteger(Number(line)));
  return lines.map(Number);
};

const solve(n: number): number => {
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
};

const main = () => {
  const inputs = readInput();
  const totalSteps = inputs.reduce((sum, n) => sum + solve(n), 0);
  console.log(`total=${totalSteps}`);
};

main();
