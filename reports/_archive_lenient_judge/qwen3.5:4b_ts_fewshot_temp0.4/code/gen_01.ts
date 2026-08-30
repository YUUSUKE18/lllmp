const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countMap = new Map<number, number>();
  
  for (const part of s.split(",")) {
    if (!part.trim()) continue;
    
    try {
      const n = parseInt(part.trim(), 10);
      
      // 整数として解釈できない場合はスキップ（parseInt が NaN を返す場合）
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;

      countMap.set(n, (countMap.get(n) ?? 0) + 1);
    } catch {
      // parseInt は通常例外を投げないが、安全のために無視する
    }
  }

  let totalSum = BigInt(0);
  
  for (const [num, c] of countMap.entries()) {
    if (!Number.isNaN(num)) {
      const bigNum = BigInt(num);
      totalSum += bigNum * BigInt(c);
    }
  }

  console.log(`count=${countMap.size} sum=${totalSum}`);
});
