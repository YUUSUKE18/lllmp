function collatzSteps(n: number): number {
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) n /= 2;
    else n = 3 * n + 1;
    steps++;
  }
  return steps;
}

function memoizeCollatzSteps(n: number): number {
  const memo = new Map<number, number>();
  const recursiveCollatzSteps = (n: number): number => {
    if (memo.has(n)) return memo.get(n)!;
    if (n === 1) return 0;
    const steps = recursiveCollatzSteps(n % 2 === 0 ? n / 2 : 3 * n + 1) + 1;
    memo.set(n, steps);
    return steps;
  };
  return recursiveCollatzSteps(n);
}

let totalSteps = 0;
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(n => !isNaN(parseInt(n, 10)));
  for (const n of numbers) {
    totalSteps += memoizeCollatzSteps(parseInt(n, 10));
  }
  console.log(`total=${totalSteps}`);
});
