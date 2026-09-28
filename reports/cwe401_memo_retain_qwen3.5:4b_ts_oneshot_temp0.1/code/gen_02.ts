const memo = new Map<number, number>();
let total = 0;

function collatzStep(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
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
    if (line.trim() === "") continue;
    
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      
      const steps = collatzStep(n);
      total += steps;
    }
  }
  
  process.stdin.on("end", () => {
    console.log(`total=${total}`);
  });
});
