function memoizedCollatz(n: number, memo: Map<number, number>): number {
  if (!memo.has(n)) {
    if (n % 2 === 0) {
      memo.set(n, 1 + memoizedCollatz(n / 2, memo));
    } else {
      memo.set(n, 1 + memoizedCollatz(3 * n + 1, memo));
    }
  }
  return memo.get(n)!;
}

let total = 0;
const memo = new Map<number, number>();

process.stdin.on('data', (chunk) => {
  const lines = chunk.toString().split('\n');
  for (const line of lines) {
    if (line.trim() === '') continue;
    const n = parseInt(line, 10);
    total += memoizedCollatz(n, memo);
  }
});

process.stdin.on('end', () => {
  console.log(`total=${total}`);
});
