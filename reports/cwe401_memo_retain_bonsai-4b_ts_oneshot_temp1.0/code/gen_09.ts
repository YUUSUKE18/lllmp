const memo = new Map<string, number>(());
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(c).toString("utf8");
  const lines = s.split(/\s+/);
  for (const line of lines) {
    if (!/^\s*-\s*$/.test(line)) continue;
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    if (n === 1) continue;
    const step = n % 2 === 0 ? n / 2 : 3 * n + 1;
    let steps = 0;
    let current = n;
    const seen = new Set<string>();
    
    while (current !== 1) {
      if (seen.has(current.toString())) break;
      seen.add(current.toString());
      current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
      steps++;
    }
    if (steps === 0) steps = 0;
    total += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
