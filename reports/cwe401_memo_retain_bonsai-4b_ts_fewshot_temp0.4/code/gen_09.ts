const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const results: Map<number, number> = new Map();
  
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;
    
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
      
      count += 1;
    }
    
    results.set(n, count);
  }
  
  const total = results.values().reduce((a, b) => a + b, 0);
  console.log(`total=${total}`);
});
