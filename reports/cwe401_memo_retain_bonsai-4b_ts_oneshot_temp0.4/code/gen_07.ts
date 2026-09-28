const data: Buffer[] = [];
let memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (n === 1) {
      total += 0;
    } else if (memo.has(n)) {
      total += memo.get(n);
    } else {
      let current = n;
      let steps = 0;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
        if (memo.has(current)) {
          break;
        }
        if (current > 2^32) {
          break;
        }
      }
      if (current === 1) {
        memo.set(n, steps);
        memo.set(current, steps);
        total += steps;
      } else {
        memo.set(n, steps);
        memo.set(current, steps);
      }
    }
  }
  console.log(`total=${total}`);
});
