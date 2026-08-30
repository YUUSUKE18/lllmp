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
      
      // 重複数をカウントし、合計に追加（BigInt で計算）
      count.set(n, (count.get(n) || BigInt(0n)) + 1n);
      sum += BigInt(n);
    } catch {
      // 整数として解釈できない場合は無視
      continue;
    }
  }

  const total = count.size;
  
  console.log(`count=${total} sum=${sum}`);
});
