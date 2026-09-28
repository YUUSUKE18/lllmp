const data: Buffer[] = [];
let memo: Map<number, number> = new Map();

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let total = 0;

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      if (!/^\s*$/.test(part)) {
        const n = parseInt(part, 10);
        if (n < 0) continue;
        if (n === 1) continue; // 1は手数は0

        if (memo.has(n)) continue;

        let current = n;
        let steps = 0;

        // 64bit 整数範囲内で計算
        while (current !== 1) {
          if (current % 2 === 0) {
            current = current / 2;
          } else {
            current = 3 * current + 1;
          }
          steps++;

          // 3n+1が1になるまで計算
          if (current > 2^63) {
            break;
          }
        }

        if (current !== 1) {
          memo.set(n, steps);
        } else {
          memo.set(n, 0);
        }

        total += steps;
      }
    }
  }

  console.log(`total=${total}`);
});
