const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let sum = BigInt(0);
  const counts = new Map<string, number>();

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    const key = String(n);
    counts.set(key, counts.get(key) || 0 + 1);
    
    // 64bit 整数の範囲内であることを仮定して、BigInt を使用
    sum += BigInt(n);
  }

  console.log(`count=${counts.size} sum=${sum}`);
});
