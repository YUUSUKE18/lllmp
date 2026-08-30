const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const counts = new Map<number, number>();
  
  for (const part of parts) {
    if (!part.trim()) continue;
    
    try {
      const num = parseInt(part.trim(), 10);
      if (isNaN(num)) continue;
      
      let c = counts.get(num) ?? 0;
      c++;
      counts.set(num, c);
    } catch {
      // 解析エラーは無視
    }
  }
  
  let count = 0;
  let sum = 0n;
  
  for (const [num, n] of counts) {
    count += n;
    sum += BigInt(num);
  }
  
  console.log(`count=${count} sum=${sum}`);
});
