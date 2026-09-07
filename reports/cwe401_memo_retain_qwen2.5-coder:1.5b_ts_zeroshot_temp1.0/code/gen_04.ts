import { readLines } from 'readline';

function countSteps(n: number): number {
  if (n === 1) return 0;

  const memo = new Map<number, number>();
  let steps = 0;

  while (n !== 1) {
    if (memo.has(n)) {
      steps += memo.get(n);
      break;
    }

    steps++;
    memo.set(n, steps);

    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }

  return steps + memo.get(n);
}

async function main() {
  const lines = await readLines(process.stdin);
  const totalSteps = lines.reduce((acc, line) => acc + countSteps(parseInt(line, 10)), 0);
  console.log(`total=${totalSteps}`);
}

main();
