const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = 0;
  if (lines.length > 0 && /^\s*-?\d+\s*$/.test(lines[0])) {
    target = parseInt(lines[0].trim(), 10);
  } else {
    target = 0;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    nums.push(n);
  }

  const count = new Map<number, number>();
  let pairs = 0;
  for (const num of nums) {
    if (count.has(target - num)) {
      pairs += count.get(target - num)!;
    }
    count.set(num, (count.get(num) || 0) + 1);
  }

  console.log(`pairs=${pairs}`);
});
