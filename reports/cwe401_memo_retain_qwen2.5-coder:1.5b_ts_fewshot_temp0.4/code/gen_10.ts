const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let memo = new Map<number, number>();
  let total = 0;
  for (const q of s.split("\n")) {
    if (q.trim() === "") continue;
    const n = parseInt(q, 10);
    if (Number.isNaN(n) || n < 1) continue;
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n /= 2;
      else n = 3 * n + 1;
      steps++;
    }
    total += steps;
    memo.set(n, steps);
  }
  console.log(`total=${total}`);
});
