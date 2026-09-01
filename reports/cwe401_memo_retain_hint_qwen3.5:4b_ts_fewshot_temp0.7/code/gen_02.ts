const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  let total = 0;
  const lines: string[] = [];
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      const n = parseInt(line.trim(), 10);
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;
      lines.push(String(n));
    } catch {
      continue;
    }
  }

  for (const str of lines) {
    let n: number = parseInt(str, 10);
    while (n !== 1) {
      if (!memo.has(n)) {
        memo.set(n, 0);
      }
      const steps = memo.get(n)!;
      if ((n % 2 === 0 && n / 2 === 1) || (n % 2 !== 0 && (3 * n + 1) === 1)) {
        break;
      } else if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
    }
    total += memo.get(n)!;
  }

  console.log(`total=${total}`);
});
