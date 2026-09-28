const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueSet = new Set<number>();
  let sum = BigInt(0);

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    uniqueSet.add(n);
    sum += BigInt(n);
  }

  console.log(`count=${uniqueSet.size} sum=${sum}`);
});
