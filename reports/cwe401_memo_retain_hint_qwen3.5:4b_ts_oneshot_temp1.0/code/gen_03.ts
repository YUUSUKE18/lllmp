const cache = new Map<number, number>();
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(allBuffers).toString("utf8");
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n) || isNaN(n)) continue;

    let count = 0;
    while (n !== 1) {
      if (cache.has(n)) {
        count += cache.get(n)!;
        break;
      }
      const next = n % 2 === 0 ? Math.floor(n / 2) : 3 * n + 1;
      cache.set(next, 0);
      n = next;
      if (cache.has(n)) {
        count += cache.get(n)!;
        break;
      }
      cache.set(n, count);
    }
    total += count;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
