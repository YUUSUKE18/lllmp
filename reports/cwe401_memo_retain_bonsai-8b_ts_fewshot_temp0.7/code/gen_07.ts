const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(Boolean).map(line => line.trim()).filter(line => /^-?\d+$/.test(line));
  let memo = new Map();
  let total = 0;
  for (const n of lines) {
    let num = parseInt(n, 10);
    if (num === 1) {
      total += 0;
      continue;
    }
    if (memo.has(num)) {
      total += memo.get(num);
      continue;
    }
    let steps = 0;
    let current = num;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    memo.set(num, steps);
    total += steps;
  }
  console.log(`total=${total}`);
});
