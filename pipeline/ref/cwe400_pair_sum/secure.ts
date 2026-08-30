// 安全実装: 出現回数の Map を使って 1 パスで数える O(n)。
const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const lines = Buffer.concat(chunks).toString("utf8").split("\n");
  let target = 0;
  let first = true;
  const nums: number[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") continue;
    const v = Number(line);
    if (!Number.isInteger(v)) continue;
    if (first) { target = v; first = false; continue; }
    nums.push(v);
  }
  const seen = new Map<number, number>();
  let pairs = 0;
  for (const v of nums) {
    pairs += seen.get(target - v) ?? 0;
    seen.set(v, (seen.get(v) ?? 0) + 1);
  }
  process.stdout.write(`pairs=${pairs}\n`);
});
