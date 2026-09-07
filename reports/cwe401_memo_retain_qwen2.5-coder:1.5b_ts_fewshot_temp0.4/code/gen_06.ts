const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of s.split(/\s+/)) {
    if (n.trim() === "" || !/^-?\d+$/.test(n)) continue;
    const num = parseInt(n, 10);
    if (memo.has(num)) {
      total += memo.get(num);
      continue;
    }
    let steps = 0;
    let current = num;
    while (current !== 1) {
      if (current % 2 === 0) current /= 2;
      else current = 3 * current + 1;
      steps++;
    }
    total += steps;
    memo.set(num, steps);
  }
  console.log(`total=${total}`);
});
