const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token.trim(), 10);
      
      // 重複カウントと合計の更新（BigInt で計算）
      count.set(n, (count.get(n) || BigInt(0)) + BigInt(1));
      sum += BigInt(n);
    } catch (_) {}
  }

  const total = [...count.entries()].reduce((acc: [number, number][], item) => {
    acc.push(item[0]); // unique count
    return acc;
  }, [] as any)[0] || 0; 

  console.log(`count=${total} sum=${sum}`);
});
