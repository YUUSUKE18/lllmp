const memo = new Map<number, number>();

function collatzStep(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  let curr = n;
  while (curr !== 1) {
    if (curr % 2 === 0) {
      curr = curr / 2;
    } else {
      curr = 3 * curr + 1;
    }
    steps++;
  }
  
  memo.set(n, steps);
  return steps;
}

process.stdin.on("data", (c: Buffer) => {
  const s = c.toString("utf8");
  const lines = s.split("\n");
  let totalSteps = 0n; // Use BigInt for safety, though max fits in JS Number usually.

  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    const steps = collatzStep(n);
    totalSteps += BigInt(steps);
  }

  process.stdout.write(`total=${totalSteps}\n`);
});
