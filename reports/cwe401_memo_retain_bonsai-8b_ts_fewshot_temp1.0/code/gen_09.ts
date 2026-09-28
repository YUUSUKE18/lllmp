const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(Boolean).map(line => line.trim()).filter(Number);
  let total = 0;
  const memo = new Map<string, number>();
  
  for (const n of lines) {
    if (memo.has(n)) total += memo.get(n);
    else {
      let count = 0;
      let current = Number(n);
      memo.set(n, count);
      while (current !== 1) {
        if (current % 2 === 0) current = current / 2;
        else current = 3 * current + 1;
        count++;
      }
      total += count;
    }
  }
  console.log(`total=${total}`);
});
