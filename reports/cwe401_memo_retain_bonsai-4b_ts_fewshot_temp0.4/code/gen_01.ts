const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\s+/).filter(Boolean).length;
  const memo: Map<number, number> = new Map<string | number | null | undefined, number>();
  
  let total = 0;
  const processed = s.split(/\s+/).filter(Boolean);
  
  for (const n of processed) {
    const n = parseInt(n, 10);
    if (isNaN(n)) continue;
    
    if (n === 1) {
      total += 0;
      continue;
    }
    
    let steps = 0;
    const current = n;
    const seen = new Set<string>();
    
    while (current !== 1) {
      if (seen.has(current.toString())) break;
      seen.add(current.toString());
      
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      
      steps++;
    }
    
    if (current === 1) {
      total += steps;
    }
  }
  
  console.log(`total=${total}`);
});
