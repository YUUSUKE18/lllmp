const visited = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    const n = parseInt(line.trim(), 10);
    if (!Number.isFinite(n)) continue;

    let steps = 0;
    while (n !== 1) {
      let next: number;
      if (n % 2 === 0) {
        next = n / 2;
      } else {
        next = 3 * n + 1;
      }

      if (!visited.has(next)) {
        visited.set(next, 0);
      }
      const memoizedSteps = (visited.get(n as number) || 0n);
      steps += Number(memoizedSteps);
      
      n = next;
    }

    total += BigInt(steps);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
