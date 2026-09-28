const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      target = n;
      break;
    }
  }

  let nums: bigint[] = [];
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = BigInt(part);
      if (!Number.isNaN(Number(n))) {
        nums.push(n);
      }
    }
  }

  let pairs = 0n;
  const seen = new Set<bigint>();
  for (const num of nums) {
    const needed = target - num;
    if (seen.has(needed)) {
      pairs++;
    }
    seen.add(num);
  }

  console.log(`pairs=${pairs}`);
});
