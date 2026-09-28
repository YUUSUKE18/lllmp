const memo = new Map<number, number>();
let total = 0;

function collatzStep(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  let current = n;
  
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  
  memo.set(n, steps);
  return steps;
}

process.stdin.on("data", (c: Buffer) => {
  const s = c.toString("utf8");
  const lines = s.split("\n");
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      
      total += collatzStep(n);
    }
  }
  
  process.stdin.on("end", () => {
    console.log(`total=${total}`);
  });
});
