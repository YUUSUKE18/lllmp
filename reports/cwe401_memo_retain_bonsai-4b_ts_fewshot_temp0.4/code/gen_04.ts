const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r|\n/).filter(line => line.trim() !== "");
  const nMap = new Map<string | number | { n: number } | { n: number, steps: number } | { n: number, steps: number, memo: boolean }>();
  let totalSteps = 0;
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;
    if (n === 1) {
      continue;
    }
    if (nMap.has(n)) {
      const { n, steps } = nMap.get(n);
      totalSteps += steps;
      continue;
    }
    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    nMap.set(n, { n, steps });
    totalSteps += steps;
  }
  console.log(`total=${totalSteps}`);
});
