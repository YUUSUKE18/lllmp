interface MemoizedFunction {
  [key: number]: number;
}

function collatzSteps(n: number, memo: MemoizedFunction): number {
  if (memo[n] !== undefined) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) return memo[n] = 1 + collatzSteps(n / 2, memo);
  return memo[n] = 1 + collatzSteps(3 * n + 1, memo);
}

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const memo: MemoizedFunction = {};
  for (const n of s.split("\n")) {
    const nNum = parseInt(n, 10);
    if (Number.isNaN(nNum)) continue;
    total += collatzSteps(nNum, memo);
  }
  console.log(`total=${total}`);
});
