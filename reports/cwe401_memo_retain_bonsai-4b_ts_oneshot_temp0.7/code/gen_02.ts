const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of numbers) {
    const num = parseInt(n, 10);
    if (isNaN(num)) continue;
    if (memo.has(num)) continue;
    let steps = 0;
    let current = num;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (memo.has(current)) break;
      memo.set(current, steps + 1);
      steps++;
    }
    if (!memo.has(num)) {
      let steps = 0;
      let current = num;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        if (memo.has(current)) break;
        memo.set(current, steps + 1);
        steps++;
      }
      if (memo.has(num)) {
        total += memo.get(num);
      } else {
        total += steps;
      }
    }
  }
  console.log(`total=${total}`);
});
