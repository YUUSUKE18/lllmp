const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
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
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0n;
  const seen = new Set<number>();
  for (const num of nums) {
    const complement = target - num;
    if (seen.has(complement)) {
      count++;
    }
    seen.add(num);
  }

  console.log(`pairs=${count}`);
});
