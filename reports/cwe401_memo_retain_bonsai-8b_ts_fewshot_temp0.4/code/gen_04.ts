const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "");
  const numbers = lines.map(l => l.trim().replace(/[^0-9]/g, "").parseInt(l, 10));
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of numbers) {
    if (n === 1) total += 0;
    else if (memo.has(n)) total += memo.get(n);
    else {
      let count = 0;
      let current = n;
      while (current !== 1) {
        if (memo.has(current)) {
          count += memo.get(current);
          current = memo.get(current);
        } else {
          if (current % 2 === 0) current /= 2;
          else current = 3 * current + 1;
          count++;
          memo.set(current, count);
        }
      }
      total += count;
    }
  }
  console.log(`total=${total}`);
});
