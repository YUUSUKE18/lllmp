const memo: Map<number, number> = new Map();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    let current = n;
    let steps = 0n;
    
    while (current !== 1) {
      if (memo.has(current)) {
        steps += memo.get(current)!;
        break;
      }
      
      const next = current % 2 === 0 ? Math.floor(current / 2) : 3 * current + 1n;
      current = Number(next);
      steps++;
    }
    
    if (memo.has(current)) {
      steps += memo.get(current)!;
    } else {
      let temp = current;
      while (temp !== 1) {
        const next = temp % 2 === 0 ? Math.floor(temp / 2) : 3 * temp + 1n;
        temp = Number(next);
        steps++;
      }
    }
    
    memo.set(n, steps);
    total += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
