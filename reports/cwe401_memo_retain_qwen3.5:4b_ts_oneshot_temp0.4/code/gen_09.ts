const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readableState.buffer).toString("utf8");
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n) || isNaN(parseInt(line, 10))) continue;
    
    let current = n;
    let count = 0n;
    
    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        break;
      }
      
      const next = ((current % 2 === 0) ? Math.floor(current / 2) : 3 * current + 1n);
      current = Number(next);
      
      if (memo.has(current)) {
        count += memo.get(current);
        break;
      }
      
      memo.set(current, 1n);
      count++;
    }
    
    total += count;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${Number(total)}`);
});
