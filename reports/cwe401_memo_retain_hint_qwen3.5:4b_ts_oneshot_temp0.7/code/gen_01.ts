const cache = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const nStr = trimmed;
    let n: number | bigint;
    
    try {
      n = BigInt(nStr);
    } catch (e) {
      try {
        n = parseInt(nStr, 10);
      } catch {
        continue;
      }
    }
    
    if (!Number.isFinite(Number(n)) || Number(n) <= 0) continue;
    
    let steps = 0n;
    const startN = Number(n);
    
    let curr = startN;
    while (curr !== 1) {
      const prev = curr;
      if (prev % 2 === 0) {
        curr = prev / 2;
      } else {
        curr = 3n * BigInt(prev) + 1n;
      }
      
      steps++;
      if (!cache.has(curr)) {
        cache.set(curr, steps);
      } else {
        break;
      }
    }
    
    // If we reached 1, add the accumulated steps
    total += BigInt(steps);
  }
  
  console.log(`total=${total}`);
});

const data: Buffer[] = [];
