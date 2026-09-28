const memo = new Map<bigint, number>();

function getSteps(n: bigint): number {
  if (n === 1n) return 0;
  if (memo.has(n)) return memo.get(n)!;

  let next: bigint;
  if (n % 2n === 0n) {
    next = n / 2n;
  } else {
    next = n * 3n + 1n;
  }

  const steps = 1 + getSteps(next);
  memo.set(n, steps);
  return steps;
}

const input = process.stdin.read();
if (!input) {
  console.log('total=0');
  return;
}

let totalSum = 0n;
const lines = input.split('\n');

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  
  if (/^-?\d+$/.test(trimmed)) {
    const n = BigInt(trimmed);
    totalSum += getSteps(n);
  }
}

console.log(`total=${totalSum.toString()}`);
