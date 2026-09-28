const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  const seen = new Set<number>();
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (!seen.has(n)) {
      seen.add(n);
      count++;
      sum += BigInt(n);
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
