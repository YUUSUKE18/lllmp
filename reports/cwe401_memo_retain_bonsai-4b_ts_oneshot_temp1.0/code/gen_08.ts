const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max = 0;
  const memo = new Map<string | number>();
  
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (isNaN(n)) continue;
    
    if (memo.has(n)) continue;
    
    let current = n;
    let steps = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    
    memo.set(n, steps);
  }
  
  const total = data
    .map(f => parseInt(f, 10))
    .filter(n => n !== 0)
    .reduce((sum, n) => sum + memo.get(n) || 0);
  
  console.log(`total=${total}`);
});
