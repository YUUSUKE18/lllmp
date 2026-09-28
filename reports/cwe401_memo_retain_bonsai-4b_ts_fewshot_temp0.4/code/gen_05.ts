const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const results = new Map<string, number>();
  
  for (const line of lines) {
    const parts = line.split(/\s+/);
    const n = parts.length > 0 ? parseInt(parts[0], 10) : 0;
    if (isNaN(n) || n <= 0) continue;
    
    let count = 0;
    let current = n;
    
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      
      if (results.has(current)) {
        count += results.get(current);
      } else {
        results.set(current, 0);
      }
      
      if (current > 32767) break; // 32bit 整数の上限
    }
    
    if (results.has(n)) {
      results.set(n, count);
    } else {
      results.set(n, count);
    }
    
    // 1 通りの計算をメモ化
    if (current !== 1) {
      count = 0;
      current = n;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        if (current > 32767) break;
        if (results.has(current)) {
          count += results.get(current);
        } else {
          results.set(current, 0);
        }
      }
      
      // 1 通りの計算をメモ化
      if (current !== 1) {
        count = 0;
        current = n;
        while (current !== 1) {
          if (current % 2 === 0) {
            current = current / 2;
          } else {
            current = 3 * current + 1;
          }
          if (current > 32767) break;
          if (results.has(current)) {
            count += results.get(current);
          } else {
            results.set(current, 0);
          }
        }
      }
    }
  }
  
  const total = results.values().reduce((a, b) => a + b, 0);
  console.log(`total=${total}`);
});
