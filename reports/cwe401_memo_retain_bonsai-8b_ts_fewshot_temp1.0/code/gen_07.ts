const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim().match(/\d+/)).length;
  const results = new Map<number, number>();
  let total = 0;
  for (let i = 0; i < lines; i++) {
    const n = parseInt(s.split("\n")[i].trim(), 10);
    if (n === 1) results.set(n, 0);
    else {
      let current = n;
      let steps = 0;
      while (current !== 1) {
        if (results.has(current)) steps += results.get(current);
        else {
          if (current % 2 === 0) current /= 2;
          else current = 3 * current + 1;
          steps += 1;
        }
      }
      results.set(n, steps);
      total += steps;
    }
  }
  console.log(`total=${total}`);
});
