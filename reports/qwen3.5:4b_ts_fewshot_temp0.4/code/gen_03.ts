const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    count.set(n, (count.get(n) ?? 0) + 1);
    sum += BigInt(n);
  }

  console.log(`count=${count.size} sum=${sum}`);
});
