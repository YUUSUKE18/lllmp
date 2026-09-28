const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "");
  const numbers = lines.map(l => l.trim()).filter(n => /^\d+$/.test(n));
  const memo = new Map<number, number>;
  let total = 0;
  for (const n of numbers) {
    let num = parseInt(n, 10);
    if (memo.has(num)) continue;
    let count = 0;
    while (num !== 1) {
      if (memo.has(num)) {
        count += memo.get(num);
        break;
      }
      if (num % 2 === 0) num /= 2;
      else num = 3 * num + 1;
      count++;
      memo.set(num, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
