const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    if (target === null) {
      target = n;
      break;
    }
  }
  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    nums.push(n);
  }

  const count = new Map<number, number>();
  let pairs = 0n;

  for (const num of nums) {
    const needed = target - num;
    if (count.has(needed)) {
      pairs += BigInt(count.get(needed)!);
    }
    count.set(num, (count.get(num) || 0n) + 1n);
  }

  console.log(`pairs=${pairs}`);
});
