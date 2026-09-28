const data: Buffer[] = [];
let memo: Record<number, number> = new Map();

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;

    if (n === 1) {
      total += 0;
      continue;
    }

    if (memo.has(n)) continue;

    let current = n;
    let steps = 0;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;

      if (current > 1) memo.set(current, steps);
    }

    if (memo.has(1)) {
      memo.set(1, steps);
    }

    total += steps;
  }

  console.log(`total=${total}`);
});
