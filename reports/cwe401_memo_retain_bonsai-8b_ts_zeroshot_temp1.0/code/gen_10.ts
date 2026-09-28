const numbers = new Map<string, number>();
const total = 0;

function computeSteps(n: number): number {
  if (n === 1) return 0;
  if (numbers.has(n)) return numbers.get(n);

  let steps = 0;
  let current = n;

  while (current !== 1) {
    steps++;
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
  }

  numbers.set(n, steps);
  return steps;
}

process.stdin.read()
  .then(input => {
    const lines = input.trim().split('\n');
    for (const line of lines) {
      const n = parseInt(line, 10);
      if (!isNaN(n) && n >= 1) {
        total += computeSteps(n);
      }
    }
    process.stdout.write(`total=${total}\n`);
  })
  .catch(() => {
    process.stdout.write('total=0\n');
  });
