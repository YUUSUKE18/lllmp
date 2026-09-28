import { max } from "lodash";

let memo: Record<number, number> = {};

function collatz(n: number): number {
  if (memo[n] !== undefined) return memo[n];
  if (n === 1) return 0;
  memo[n] = 1 + (n % 2 === 0 ? collatz(n / 2) : collatz(3 * n + 1));
  return memo[n];
}

let total = 0;
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  for (const f of s.split(/\s+/).filter(f => !/^\s*$/.test(f))) {
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    total += collatz(n);
  }
});
process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
