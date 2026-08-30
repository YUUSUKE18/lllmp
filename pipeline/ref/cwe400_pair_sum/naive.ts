// 素朴実装: 全ペアを二重ループで走査する O(n^2)（CWE-400）。
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
  let pairs = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) pairs++;
    }
  }
  process.stdout.write(`pairs=${pairs}\n`);
});
