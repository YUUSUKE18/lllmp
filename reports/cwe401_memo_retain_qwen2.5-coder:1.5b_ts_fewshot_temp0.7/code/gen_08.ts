const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  for (const q of s.split("\n")) {
    if (q.trim() === "") continue;
    const n = parseInt(q, 10);
    if (Number.isNaN(n) || n <= 0) continue;

    let count = 0;
    let current = n;

    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        break;
      }
      count++;
      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      memo.set(current, count);
    }

    total += count;
  }

  console.log(`total=${total}`);
});
