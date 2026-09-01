const memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin.allBuffers).toString("utf8");
  let total = 0;
  for (const line of s.split("\n")) {
    if (!line.trim() || !/^-?\d+$/.test(line)) continue;
    const n = parseInt(line, 10);
    if (isNaN(n) || n < 1) continue;
    let steps = 0;
    while (n !== 1) {
      if (memo.has(n)) {
        steps += memo.get(n)!;
        break;
      }
      const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
      if (!memo.has(next)) memo.set(next, 0);
      if (next > Number.MAX_SAFE_INTEGER) {
        memo.set(next, steps + 1);
        steps += 1;
        n = next as number; // Cast to avoid TS error, value is large but within 64-bit
      } else {
        n = next as number;
      }
    }
    total += steps;
  }
  console.log(`total=${total}`);
});
