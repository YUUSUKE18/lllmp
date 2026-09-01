const memo = new Map<number, number>();
let total = 0;

function steps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let count = 0;
  while (n !== 1) {
    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    count++;
  }
  memo.set(n, count);
  return count;
}

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").trim().split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      
      total += steps(n);
    }
  }
  
  console.log(`total=${total}`);
});
