const memo: Map<number, number> = new Map();

function collatzStep(n: number): number {
  if (n === 1) return 0;
  
  const key = n.toString(); // Use string as key to handle large numbers safely in JS
  let steps = memo.get(key);
  if (steps !== undefined) return steps;

  let nextN: number | bigint;
  if (n % 2 === 0) {
    nextN = n / 2;
  } else {
    nextN = BigInt(3 * n + 1n);
  }

  const subSteps = collatzStep(nextN as number);
  steps = 1 + subSteps;
  
  memo.set(key, steps);
  return steps;
}

function parseInput(input: string): Set<string> {
  const nums = new Set<string>();
  for (const line of input.trim().split('\n')) {
    if (!line) continue;
    try {
      parseInt(line);
      nums.add(line);
    } catch {
      // Ignore non-integer lines
    }
  }
  return nums;
}

function main() {
  const input = process.stdin.read();
  const queries = parseInput(input);
  
  let totalSteps = 0;
  for (const nStr of queries) {
    const n = parseInt(nStr);
    if (!Number.isNaN(n)) {
      totalSteps += collatzStep(n);
    }
  }

  console.log(`total=${totalSteps}`);
}

main();
