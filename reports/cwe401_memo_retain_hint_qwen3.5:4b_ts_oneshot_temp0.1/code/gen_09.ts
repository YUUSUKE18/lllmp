const memo = new Map<number, number>();
let total = 0;

function steps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let next: number;
  if (n % 2 === 0) {
    next = n / 2;
  } else {
    next = 3 * n + 1;
  }
  
  const count = 1 + steps(next);
  memo.set(n, count);
  return count;
}

process.stdin.on("data", (c: Buffer) => {
  const s = c.toString("utf8");
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    
    total += steps(n);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
