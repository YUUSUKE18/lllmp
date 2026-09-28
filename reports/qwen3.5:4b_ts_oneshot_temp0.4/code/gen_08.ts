const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let sum = BigInt(0);
  let count = new Map<number, number>();

  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    if (!count.has(n)) {
      count.set(n, 0n);
    }
    const currentCount = count.get(n)!;
    count.set(n, currentCount + 1n);
    sum += BigInt(n) * currentCount;
  }

  // 重複を除いた要素の数（ユニークな整数の個数）
  const uniqueCount = count.size;
  
  console.log(`count=${uniqueCount} sum=${sum}`);
});
