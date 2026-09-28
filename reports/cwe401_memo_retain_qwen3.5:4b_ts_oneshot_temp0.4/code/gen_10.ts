const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin.allBuffers).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n) || isNaN(n)) continue;
    
    let current = n;
    let count = 0n;
    
    while (current !== 1) {
      if (memo.has(current)) {
        const subCount = memo.get(current);
        total += BigInt(subCount);
        break;
      }
      
      if (current % 2 === 0) {
        current = Math.floor(current / 2);
      } else {
        current = 3 * current + 1;
      }
      
      count++;
    }
    
    memo.set(n, count);
    total += count;
  }
  
  console.log(`total=${total}`);
});
