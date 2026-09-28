const cache = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(Buffer.from([c])).toString("utf8");
  let lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    for (const f of line.split(/\s+/)) {
      const n = parseInt(f, 10);
      if (Number.isNaN(n)) continue;
      const result = computeCollatzSteps(n);
      console.log(`total=${cache.get(n) + (n === 1 ? 0 : computeCollatzSteps(1))}`);
    }
  }
});

function computeCollatzSteps(n: number): number {
  if (n === 1) return 0;
  const steps = cache.get(n);
  if (steps !== undefined) return steps;
  
  let next = n;
  if (next % 2 === 0) next = next / 2;
  else next = 3 * next + 1;
  
  cache.set(n, 1 + computeCollatzSteps(next));
  return cache.get(n)!;
}
