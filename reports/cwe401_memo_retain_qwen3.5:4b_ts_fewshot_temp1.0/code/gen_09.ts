const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  memo.set(1, 0);
  let total = 0;

  function calc(n: number): number {
    if (!memo.has(n)) {
      let steps = 0;
      let current = n;
      while (current !== 1) {
        steps++;
        const next = current % 2 === 0 ? Math.floor(current / 2) : 3 * current + 1;
        memo.set(next, steps);
        current = next;
      }
      memo.set(n, steps);
    }
    return memo.get(n)!;
  }

  for (const line of s.split(/\r?\n/)) {
    const parts: string[] = line.trim().split(/\s+/);
    let i = 0;
    while (i < parts.length) {
      const word = parts[i];
      const n = parseInt(word, 10);
      if (Number.isNaN(n) || isNaN(Number(word)) || !Number.isFinite(n)) {
        i++;
        continue;
      }
      total += calc(n);
      i++;
    }
  }

  console.log(`total=${total}`);
});
