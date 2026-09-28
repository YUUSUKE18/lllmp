const memo = new Map<number, number>();

function collatzStep(n: number): number {
  if (n === 1) return 0;
  const step = n % 2 === 0 ? 1 : 1 + (3 * n + 1) / 2; // Odd case: next is 3n+1, then divide by 2
  return memo.get(n) ??= collatzStep(3 * n + 1);
}

function solve(): number {
  const data: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => data.push(c));
  process.stdin.on("end", () => {
    let total = 0;
    for (const line of data.map(Buffer).map(b => b.toString("utf8").trim()).filter(l => l.length > 0)) {
      const parts = line.split(/\s+/);
      for (const part of parts) {
        if (part === "") continue;
        const n: number = parseInt(part, 10);
        if (isNaN(n)) continue;
        total += collatzStep(n);
      }
    }
    console.log(`total=${total}`);
  });
}

solve();
