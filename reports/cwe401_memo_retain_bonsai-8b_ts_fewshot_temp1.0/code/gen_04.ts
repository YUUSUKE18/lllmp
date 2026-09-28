const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "").length;
  const numbers = lines.map(line => parseInt(line, 10));
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
          current = current % 2 === 0 ? current / 2 : 3 * current + 1;
          memo.set(current, count + 1);
        }
        count++;
      }
      memo.set(n, count);
      total += count;
    }
  }
  console.log(`total=${total}`);
});
