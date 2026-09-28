const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const parsedInts = lines.map(line => parseInt(line.trim(), 10));
  const memo = new Map<number, number>();
  
  let total = 0;
  for (const n of parsedInts) {
    if (n === 1) continue;
    if (memo.has(n)) continue;
    
    let current = n;
    let steps = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (memo.has(current)) break;
      steps++;
      memo.set(current, steps);
    }
    
    if (memo.has(n)) {
      total += memo.get(n);
    } else {
      total += steps;
    }
  }
  
  console.log(`total=${total}`);
});
