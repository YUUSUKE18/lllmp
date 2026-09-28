const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readData).toString("utf8");
  if (!s.trim()) return;
  
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    
    let steps = 0;
    let current = n;
    
    while (current !== 1) {
      if (memo.has(current)) {
        steps += memo.get(current);
        break;
      }
      
      const next = (current % 2 === 0) ? Math.floor(current / 2) : 3 * current + 1n;
      
      if (typeof next === "number") {
        current = next as number;
      } else {
        current = Number(next);
      }
      
      if (!memo.has(current)) {
        memo.set(current, 0);
      }
      steps++;
    }
    
    total += BigInt(steps);
  }
  
  process.stdin.emit("end");
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
