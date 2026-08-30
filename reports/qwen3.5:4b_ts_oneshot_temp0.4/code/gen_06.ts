const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = BigInt(0);
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (!nums.has(n)) {
      nums.add(n);
      sum += BigInt(n);
    }
  }
  console.log(`count=${nums.size} sum=${sum}`);
});
