const memo = new Map<string, number>();
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  const line = c.toString("utf8").split(/\s+/).filter(Boolean);
  if (line.length === 0) return;
  
  for (const n of line) {
    const num = parseInt(n, 10);
    if (isNaN(num)) continue;
    
    const steps = computeSteps(num);
    memo.set(num.toString(), steps);
    total += steps;
  }
});

function computeSteps(n: number): number {
  if (n === 1) return 0;
  
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
  
  return steps;
}
