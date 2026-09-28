const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  if (lines.length > 0 && !isNaN(Number(lines[0].trim()))) {
    target = Number(lines[0].trim());
  }
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const n = parseInt(p, 10);
      if (!isNaN(n)) nums.push(n);
    }
  }
  let count = 0;
  const seen = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (seen.has(target - val)) {
      count++;
    } else {
      seen.add(val);
    }
  }
  console.log(`pairs=${count}`);
});
