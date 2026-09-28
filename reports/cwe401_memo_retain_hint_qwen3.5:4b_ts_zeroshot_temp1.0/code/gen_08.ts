const memo = new Map<number, number>();

function computeCollatzSteps(n: number): number {
  let steps = 0;
  const original = n;
  while (n !== 1) {
    if (memo.has(n)) {
      return steps + memo.get(n)!;
    }
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      // eslint-disable-next-line no-implicit-coercion
      n = (3 * BigInt(Number(n)) + BigInt(1)) as number;
      steps++;
    }
  }
  return steps;
}

let totalSteps = 0n;

// eslint-disable-next-line no-implicit-coercion
function solve(): void {
  for (let line of process.stdin) {
    if (line.trim() === '') continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (!Number.isInteger(n) || n <= 0) continue;

    totalSteps += BigInt(computeCollatzSteps(n));
  }
  console.log(`total=${totalSteps}`);
}
