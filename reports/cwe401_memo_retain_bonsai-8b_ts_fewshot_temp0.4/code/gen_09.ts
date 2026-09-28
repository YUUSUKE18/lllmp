const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "").length;
  const nums = lines.map(l => parseInt(l, 10)).filter(n => !isNaN(n) && n > 0);
  const memo = new Map<string, number>();
  let total = 0;
  for (const n of nums) {
    if (memo.has(n.toString())) {
      total += memo.get(n.toString());
      continue;
    }
    let count = 0;
    let num = n;
    while (num !== 1) {
      if (num % 2 === 0) num = num / 2;
      else num = 3 * num + 1;
      count++;
      if (memo.has(num.toString())) {
        count += memo.get(num.toString());
        break;
      }
    }
    memo.set(n.toString(), count);
    total += count;
  }
  console.log(`total=${total}`);
});
