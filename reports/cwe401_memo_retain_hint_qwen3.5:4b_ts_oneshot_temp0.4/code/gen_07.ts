const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    
    let current = n;
    let steps = 0n;
    
    while (current !== 1) {
      if (memo.has(current)) {
        steps += memo.get(current);
        break;
      }
      
      const next = current % 2 === 0 ? Math.floor(current / 2) : 3 * current + 1n;
      current = Number(next);
      steps++;
      
      if (memo.has(current)) {
        steps += memo.get(current);
        break;
      }
    }
    
    if (!memo.has(n)) {
      let temp = n;
      let count = 0n;
      while (temp !== 1) {
        const next = temp % 2 === 0 ? Math.floor(temp / 2) : 3 * temp + 1n;
        temp = Number(next);
        count++;
        memo.set(temp, count);
      }
      memo.set(n, count);
    }
    
    total += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
