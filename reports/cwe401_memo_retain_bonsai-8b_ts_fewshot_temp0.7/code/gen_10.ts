const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const numbers = lines.filter(line => line.trim() && /^\d+$/.test(line));
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of numbers) {
    let num = parseInt(n, 10);
    if (memo.has(num)) continue;
    let steps = 0;
    while (num !== 1) {
      if (memo.has(num)) break;
      memo.set(num, steps);
      steps++;
      if (num % 2 === 0) num /= 2;
      else num = 3 * num + 1;
    }
    if (num === 1) steps++;
    total += steps;
  }
  console.log(`total=${total}`);
});
