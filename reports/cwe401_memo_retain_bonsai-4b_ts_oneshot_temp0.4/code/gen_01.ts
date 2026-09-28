const data: Buffer[] = [];
let memo = new Map<number, number>();

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      if (!/^\s*$/.test(part)) {
        const n = parseInt(part, 10);
        if (n === 0 || isNaN(n)) continue;
        
        if (memo.has(n)) continue;
        
        let current = n;
        let steps = 0;
        
        // 64bit 整数範囲内で計算できるように制限
        while (current !== 1) {
          if (current % 2 === 0) {
            current = current / 2;
          } else {
            current = 3 * current + 1;
          }
          steps++;
        }
        
        memo.set(n, steps);
        
        total += steps;
      }
    }
  }
  
  console.log(`total=${total}`);
});
