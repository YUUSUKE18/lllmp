const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = s.split(/[,]+/).map((f) => parseInt(f.trim(), 10)).filter((n) => !Number.isNaN(n));
  const uniqueSet = new Set(nums);
  let sum: bigint = 0n;
  for (const n of uniqueSet) {
    sum += BigInt(n);
  }
  console.log(`count=${uniqueSet.size} sum=${sum}`);
});
