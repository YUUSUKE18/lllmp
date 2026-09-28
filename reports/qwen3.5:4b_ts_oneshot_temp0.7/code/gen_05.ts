const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueSet = new Set<string>();
  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part, 10);
    if (Number.isNaN(n)) continue;
    uniqueSet.add(String(n));
  }
  let sum = 0n;
  for (const v of uniqueSet) {
    sum += BigInt(v);
  }
  console.log(`count=${uniqueSet.size} sum=${sum}`);
});
