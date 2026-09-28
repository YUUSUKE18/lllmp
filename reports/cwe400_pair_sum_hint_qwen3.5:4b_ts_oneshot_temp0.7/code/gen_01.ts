const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  if (lines.length < 2) {
    console.log(`pairs=0`);
    return;
  }
  
  let target: number | undefined;
  for (const line of lines) {
    if (line.trim() === "") continue;
    try {
      const val = parseInt(line, 10);
      if (!Number.isNaN(val)) {
        target = val;
        break;
      }
    } catch {
      continue;
    }
  }

  if (target === undefined) {
    console.log(`pairs=0`);
    return;
  }

  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    try {
      const val = BigInt(parseInt(line, 10));
      if (!Number.isNaN(val)) {
        nums.push(val);
      }
    } catch {
      // ignore invalid lines
    }
  }

  let count: bigint = 0n;
  
  // Use a Set for O(1) lookups to check if (target - current) exists
  const seen: Set<bigint> = new Set();
  
  for (const num of nums) {
    const complement = target - num;
    if (seen.has(complement)) {
      count += 1n;
    }
    seen.add(num);
  }

  console.log(`pairs=${count}`);
});
