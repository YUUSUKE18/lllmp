const memo = new Map<number, number>();

function findStepCount(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  let count = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }

  memo.set(n, count);
  return count;
}

let total = 0;
process.stdin.on('data', (chunk) => {
  const lines = chunk.toString().split('\n');
  lines.forEach((line) => {
    const n = parseInt(line.trim(), 10);
    if (n > 0) {
      total += findStepCount(n);
    }
  });
});

process.stdin.on('end', () => {
  console.log(`total=${total}`);
});
