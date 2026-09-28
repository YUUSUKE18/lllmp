const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let memo: Record<number, number> = {};
  let total = 0;

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      if (!/^\s*$/.test(part)) {
        const n = parseInt(part, 10);
        if (isNaN(n)) continue;
        if (n === 1) continue; // 1は手数は0
        if (memo[n]) continue;
        let current = n;
        let steps = 0;
        while (current !== 1) {
          if (current % 2 === 0) {
            current = current / 2;
          } else {
            current = 3 * current + 1;
          }
          if (memo[current]) break;
          memo[current] = steps + 1;
          steps++;
        }
        if (memo[1]) {
          total += memo[1];
        } else {
          total += steps;
        }
      }
    }
  }

  console.log(`total=${total}`);
});
