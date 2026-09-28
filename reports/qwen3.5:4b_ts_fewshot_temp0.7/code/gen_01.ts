const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = BigInt(0);
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w, 10);
    if (Number.isNaN(n) || !Number.isFinite(n)) continue;
    const val = Number(n);
    if (val >= -2**53 && val <= 2**53) {
      nums.add(val);
      sum += BigInt(val);
    }
  }
  console.log(`count=${nums.size} sum=${sum}`);
});
