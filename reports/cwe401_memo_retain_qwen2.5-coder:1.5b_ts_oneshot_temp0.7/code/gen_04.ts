const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max = 0, first = true;
  const memo: { [key: number]: number } = {};
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (memo[n] !== undefined) continue;
    memo[n] = process(n, memo);
    if (first || memo[n] > max) { max = memo[n]; first = false; }
  }
  console.log(`total=${max}`);
});

function process(n: number, memo: { [key: number]: number }): number {
  if (n === 1) return 0;
  if (n % 2 === 0) return memo[n] = 1 + process(n / 2, memo);
  return memo[n] = 1 + process(3 * n + 1, memo);
}
