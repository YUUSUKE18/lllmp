const data: Buffer[] = [];
let memo: Record<number, number> = new Map();

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines: Buffer[] = s.split(/\s+/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    
    // メモ化済み
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
    total += steps;
  }
  
  console.log(`total=${total}`);
});
